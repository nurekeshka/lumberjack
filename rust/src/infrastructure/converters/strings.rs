use crate::domain::{LogEntity, LogType, SerializeLogs};
use chrono::NaiveDateTime;
use regex::{Error as RegexError, Regex};
use std::error::Error;

pub struct RegexLogSerializer {
    re: Regex,
}

impl RegexLogSerializer {
    pub fn new(regex: &str) -> Result<Self, RegexError> {
        let re = Regex::new(regex)?;
        Ok(Self { re })
    }
}

impl SerializeLogs for RegexLogSerializer {
    fn serialize_line(&self, line: &str) -> Result<LogEntity, Box<dyn Error>> {
        let caps = self.re.captures(line).ok_or("No match.")?;
        Ok(LogEntity {
            timestamp: NaiveDateTime::parse_from_str(&caps["timestamp"], "%Y-%m-%d %H:%M:%S")?,
            data: LogType::Windows {
                level: caps["level"].to_string(),
                source: caps["source"].to_string(),
                message: caps["message"].to_string(),
            },
            raw: line.to_string(),
        })
    }
}
