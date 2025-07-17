import { Injectable } from '@nestjs/common';
import { type AbortableAsyncIterator, type ChatResponse, Ollama } from 'ollama';
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

	prompt(
		file: string,
		query: string,
	): Promise<AbortableAsyncIterator<ChatResponse>> {
		const user = createPrompt(file, query);
		return this.ollama.chat({
			model: this.model,
			stream: true,
			messages: [
				{ role: 'system', content: this.system },
				{ role: 'user', content: user },
			],
		});
	}
}
