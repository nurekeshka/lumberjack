import { Injectable } from '@nestjs/common';
import { Ollama } from 'ollama';
import { createPrompt, model, system } from './ollama.service.helpers';

@Injectable()
export class OllamaService {
	private readonly ollama: Ollama;
	private readonly model: string;
	private readonly system: string;

	constructor() {
		this.ollama = new Ollama();
		this.system = system;
		this.model = model;
	}

	async prompt(file: string, query: string): Promise<unknown> {
		const user = createPrompt(file, query);

		const res = await this.ollama.chat({
			model: this.model,
			messages: [
				{ role: 'system', content: this.system },
				{ role: 'user', content: user },
			],
		});

		return { message: res.message.content };
	}
}
