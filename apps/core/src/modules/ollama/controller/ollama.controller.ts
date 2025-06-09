import { Controller, Get, Inject, Query } from '@nestjs/common';
import { OllamaService } from '../service/ollama.service';

@Controller('ollama')
export class OllamaController {
	@Inject(OllamaService)
	private readonly service: OllamaService;

	@Get('message')
	async message(@Query('content') content: string): Promise<unknown> {
		return {message: await this.service.message(content)};
	}
}
