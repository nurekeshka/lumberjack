import { Body, Controller, Inject, Post, Response } from '@nestjs/common';
import type { Response as ResponseExpress } from 'express';
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
	async prompt(
		@Body() body: PromptRequest,
		@Response() res: ResponseExpress,
	): Promise<void> {
		res.setHeader('Content-Type', 'text/plain; charset=utf-8');
		res.setHeader('Transfer-Encoding', 'chunked');

		const stream = await this.service.prompt(body.file, body.query);

		for await (const chunk of stream) {
			const text = chunk.message?.content ?? '';
			res.write(text);
		}

		res.end();
	}
}
