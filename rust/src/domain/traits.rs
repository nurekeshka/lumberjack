use super::logs::LogEntity;
use std::error::Error;

pub trait RetrieveLogs {
    fn retrieve_logs(&self) -> Result<Vec<LogEntity>, Box<dyn Error>>;
}

pub trait SerializeLogs {
    fn serialize_line(&self, line: &str) -> Result<LogEntity, Box<dyn Error>>;
}
