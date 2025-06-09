import { Injectable } from '@nestjs/common';
import { Ollama } from 'ollama';

@Injectable()
export class OllamaService {
	private readonly ollama: Ollama;

	constructor() {
		this.ollama = new Ollama();
	}

	async message(content: string): Promise<string> {
		const res = await this.ollama.chat({
			model: 'mistral:latest',
			messages: [{ role: 'user', content: content }],
		});

		return res.message.content;
	}
}
