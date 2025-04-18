use crate::domain::{LogEntity, RetrieveLogs, SerializeLogs};
use std::{
    error::Error,
    fs::File,
    io::{BufRead, BufReader, Error as IOError, ErrorKind},
    path::PathBuf,
};

pub struct RawFileLogInteractor<'a> {
    filepath: PathBuf,
    logs_parser: Box<dyn SerializeLogs + 'a>,
}

impl<'a> RawFileLogInteractor<'a> {
    pub fn new(path: String, logs_parser: Box<dyn SerializeLogs + 'a>) -> Result<Self, IOError> {
        let filepath = PathBuf::from(&path);

        if !filepath.exists() {
            return Err(IOError::new(ErrorKind::NotFound, "File is not there."));
        }

        Ok(Self {
            filepath,
            logs_parser,
        })
    }
}

impl<'a> RetrieveLogs for RawFileLogInteractor<'a> {
    fn retrieve_logs(&self) -> Result<Vec<LogEntity>, Box<dyn Error>> {
        let file = File::open(&self.filepath)?;
        let reader = BufReader::new(file);
        let mut entries: Vec<LogEntity> = Vec::new();

        for line in reader.lines().flatten() {
            println!("{}", line);
            let value = self.logs_parser.serialize_line(&line)?;
            entries.push(value);
        }

        Ok(entries)
    }
}
