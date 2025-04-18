use chrono::NaiveDateTime;
use std::net::{IpAddr, Ipv4Addr, Ipv6Addr};

pub struct LogEntity {
    pub timestamp: NaiveDateTime,
    pub data: LogType,
    pub raw: String,
}

impl LogEntity {
    fn new(timestamp: NaiveDateTime, data: LogType, raw: String) -> Self {
        Self {
            timestamp,
            data,
            raw,
        }
    }
}

pub enum LogType {
    Unknown,
    Access {
        ip: Option<IpAddr>,
        ipv4: Option<Ipv4Addr>,
        ipv6: Option<Ipv6Addr>,
        method: HttpMethod,
    },
    Windows {
        level: String,
        source: String,
        message: String,
    },
}

pub enum HttpMethod {
    GET,
    POST,
    DELETE,
    PATCH,
    PUT,
}
