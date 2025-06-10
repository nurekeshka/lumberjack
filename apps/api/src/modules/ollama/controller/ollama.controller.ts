import { Body, Controller, Inject, Post } from '@nestjs/common';
import type { OllamaResponse } from '@packages/contract';
import { OllamaService } from '../service/ollama.service';

interface PromptRequest {
	file: string;
	query: string;
}

@Controller('ollama')
export class OllamaController {
	@Inject(OllamaService)
	private readonly service: OllamaService;

	@Post('prompt')
	prompt(@Body() body: PromptRequest): Promise<OllamaResponse> {
		return this.service.prompt(body.file, body.query);
	}
}
