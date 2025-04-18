use domain::RetrieveLogs;
use infrastructure::{
    converters::strings::RegexLogSerializer, storage::file::RawFileLogInteractor,
};
use std::error::Error;

mod domain;
mod infrastructure;

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let file_log_interactor = RawFileLogInteractor::new(
        "assets/logs/windows.log".to_string(),
        Box::new(
            RegexLogSerializer::new(
                r"(?x)
            ^(?P<timestamp>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}),\s+
            (?P<level>\w+)\s+
            (?P<source>\w+)\s+
            (?P<message>.+)
        ",
            )
            .unwrap(),
        ),
    )?;

    let vector = file_log_interactor.retrieve_logs()?;

    for entity in vector {
        println!("{}", entity.raw);
        println!("{}", entity.timestamp);
        println!();
    }

    Ok(todo!())
}
