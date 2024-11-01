from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import logging
import logging.handlers
import json
import os
import xml.etree.ElementTree as ET
from typing import Dict, Optional
import time
from models.response_templates import (
    create_logon_response,
    create_logoff_response,
    create_ticket_response,
    create_error_response
)
from config.default_config import DEFAULT_CONFIG

# Initialize FastAPI app
app = FastAPI(title="Strong-TIBA Middleware")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
log_dir = "logs"
os.makedirs(log_dir, exist_ok=True)

logger = logging.getLogger("tiba_middleware")
logger.setLevel(logging.INFO)

handler = logging.handlers.RotatingFileHandler(
    f"{log_dir}/tiba_middleware.log",
    maxBytes=6*1024*1024,  # 6MB
    backupCount=10
)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

# Session storage
active_sessions: Dict[str, dict] = {}
dedup_cache: Dict[str, datetime] = {}

@app.post("/validate")
async def validate(request: Request):
    try:
        request_data = await request.body()
        request_str = request_data.decode()
        
        # Parse XML
        root = ET.fromstring(request_str)
        header = root.find('.//Header')
        message_type = header.find('MessageType').text
        session_id = header.find('SessionID').text if header.find('SessionID') is not None else None

        logger.info(f"Received {message_type} request", extra={
            "message_type": message_type,
            "session_id": session_id
        })

        if message_type == "Logon":
            # Generate new session ID and store session info
            session_id = str(int(time.time()))
            active_sessions[session_id] = {
                "created_at": datetime.now(),
                "last_activity": datetime.now()
            }
            logger.info("Session created", extra={"session_id": session_id})
            return create_logon_response(session_id)

        elif message_type == "Logoff":
            if session_id not in active_sessions:
                logger.warning("Invalid session for logoff", extra={"session_id": session_id})
                return create_error_response(session_id, "INVALID_SESSION", "Invalid or expired session")
            
            del active_sessions[session_id]
            logger.info("Session terminated", extra={"session_id": session_id})
            return create_logoff_response(session_id, DEFAULT_CONFIG)

        elif message_type == "TicketLookup":
            if session_id not in active_sessions:
                logger.warning("Invalid session for lookup", extra={"session_id": session_id})
                return create_error_response(session_id, "INVALID_SESSION", "Invalid or expired session")

            visual_id = root.find('.//VisualID').text
            
            # Check deduplication
            if visual_id in dedup_cache:
                last_request = dedup_cache[visual_id]
                if (datetime.now() - last_request).total_seconds() < DEFAULT_CONFIG["dedup_duration"]:
                    logger.info("Duplicate request detected", extra={"visual_id": visual_id})
                    return create_error_response(session_id, "DUPLICATE", "Duplicate request detected")

            dedup_cache[visual_id] = datetime.now()

            # Check if VisualID is in bypass list
            if visual_id in DEFAULT_CONFIG["bypass_visualids"]:
                logger.info("Bypass VisualID processed", extra={"visual_id": visual_id})
                return create_ticket_response(visual_id, "bypass", DEFAULT_CONFIG)

            # Check if VisualID requires lookup
            if visual_id in DEFAULT_CONFIG["lookup_visualids"]:
                # Mock lookup response for demonstration
                has_uses = visual_id in ["406", "407", "412", "413", "415"]
                logger.info("Lookup VisualID processed", extra={
                    "visual_id": visual_id,
                    "has_uses": has_uses
                })
                return create_ticket_response(visual_id, "lookup", DEFAULT_CONFIG, has_uses)

            logger.warning("Unknown VisualID", extra={"visual_id": visual_id})
            return create_error_response(session_id, "INVALID_VID", "Invalid VisualID")

        else:
            logger.error("Unsupported message type", extra={"message_type": message_type})
            return create_error_response(session_id, "UNSUPPORTED", "Unsupported message type")

    except Exception as e:
        logger.error("Request processing failed", extra={"error": str(e)})
        return create_error_response(session_id if 'session_id' in locals() else None, 
                                   "SYSTEM_ERROR", 
                                   str(e))