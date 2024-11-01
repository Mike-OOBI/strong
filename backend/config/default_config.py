DEFAULT_CONFIG = {
    "api_url": "http://parkingapi.example.com",
    "username": "42",
    "password": "TV03Jcdwn4b",
    "dedup_duration": 10,
    "bypass_config": {
        "default_kind": "30",
        "additional_kinds": [],
        "valid_until": "2024-12-31 23:59:59"
    },
    "lookup_config": {
        "response_kinds": {
            "has_uses": "20",      # When lookup shows available uses
            "no_uses": "40",       # When lookup shows no uses remaining
            "additional": []
        },
        "valid_until": "2024-12-31 23:59:59"
    },
    "bypass_visualids": [
        "136", "138", "139", "143", "148", "149", "150", "300",
        "400", "401", "402", "405", "409", "410", "419", "418",
        "600", "601", "501", "411"
    ],
    "lookup_visualids": [
        "406", "407", "408", "412", "413", "414", "415", "500"
    ],
    "facility": "10",
    "acp": "505",
    "operation": "10"
}