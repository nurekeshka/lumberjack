use std::error::Error;

pub trait GenerateResponse {
    async fn generate(&self, prompt: &str) -> Result<String, Box<dyn Error>>;
}
