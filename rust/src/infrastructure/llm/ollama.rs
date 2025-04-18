use super::traits::GenerateResponse;
use ollama_rs::{generation::completion::request::GenerationRequest, models::ModelOptions, Ollama};
use std::error::Error;

pub struct OllamaInteractor {
    ollama: Ollama,
    name: String,
}

trait OllamaUseCases {}

impl OllamaInteractor {
    pub fn new(name: &str) -> Self {
        Self {
            ollama: Ollama::default(),
            name: name.to_string(),
        }
    }
}

impl GenerateResponse for OllamaInteractor {
    async fn generate(&self, prompt: &str) -> Result<String, Box<dyn Error>> {
        let res = self
            .ollama
            .generate(
                GenerationRequest::new(self.name.to_string(), prompt).options(
                    ModelOptions::default()
                        .temperature(0.2)
                        .repeat_penalty(1.5)
                        .top_k(25)
                        .top_p(0.25),
                ),
            )
            .await?;

        return Ok(res.response.trim().to_string());
    }
}

impl OllamaUseCases for OllamaInteractor {}
