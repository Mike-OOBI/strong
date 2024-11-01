from datetime import datetime

def create_logon_response(session_id: str) -> dict:
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return {
        "Header": {
            "MessageID": "1",
            "MessageType": "LogonResponse",
            "SessionID": session_id,
            "SourceID": "TIBA",
            "TimeStamp": timestamp,
            "EchoData": "",
            "SystemFields": ""
        },
        "Body": {
            "LogonResponse": {
                "Username": "TIBA",
                "Facility": "5",
                "Atraction": "0",
                "ACP": "900"
            }
        }
    }

def create_error_response(session_id: str, error_code: str, error_message: str) -> dict:
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return {
        "Header": {
            "MessageID": "1",
            "MessageType": "ErrorResponse",
            "SessionID": session_id,
            "SourceID": "TIBA",
            "TimeStamp": timestamp
        },
        "Body": {
            "Error": {
                "Code": error_code,
                "Message": error_message,
                "Severity": "Error"
            }
        }
    }

def create_logoff_response(session_id: str, config: dict) -> dict:
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return {
        "Header": {
            "MessageID": "1",
            "MessageType": "LogOffResponse",
            "SessionID": session_id,
            "SourceID": "TIBA",
            "TimeStamp": timestamp
        },
        "Body": {
            "Status": {
                "StatusCode": "0",
                "StatusText": "OK",
                "Attraction": "0",
                "ACP": "900"
            }
        }
    }

def create_ticket_response(visual_id: str, response_type: str, config: dict, has_uses: bool = True) -> dict:
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    if response_type == "bypass":
        kind = config["bypass_config"]["default_kind"]
        valid_until = config["bypass_config"]["valid_until"]
    else:  # lookup
        kind = (
            config["lookup_config"]["response_kinds"]["has_uses"]
            if has_uses
            else config["lookup_config"]["response_kinds"]["no_uses"]
        )
        valid_until = config["lookup_config"]["valid_until"]
    
    return {
        "Envelope": {
            "Header": {
                "MessageID": "1",
                "MessageType": "TicketLookupResponse",
                "SessionID": "374",
                "SourceID": "TIBA",
                "TimeStamp": timestamp
            },
            "Body": {
                "TicketLookupResponse": {
                    "Lookups": {
                        "Lookup": {
                            "VisualID": visual_id,
                            "Pass": {
                                "PassNo": "586733",
                                "PassAcct": "106226968",
                                "First": "Tester",
                                "Last": "Ticket",
                                "Street1": "2228 CityGate Dr",
                                "Street2": "",
                                "City": "Columbus",
                                "State": "OH",
                                "Zip": "43219",
                                "CountryCode": "US",
                                "Phone": "6144008926",
                                "Email": "support@tibaparking.com",
                                "DateOpened": "2019-07-01 00:00:00",
                                "DateUsed": "2019-08-06 13:21:41",
                                "ValidDays": "1",
                                "Kind": kind,
                                "ValidUntil": valid_until
                            }
                        }
                    }
                }
            }
        }
    }