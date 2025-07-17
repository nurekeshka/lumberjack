import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
	private readonly http = inject(HttpClient);

	async next(
		query: string,
		file: string,
		onData: (chunk: string) => void,
	): Promise<void> {
		const res = await fetch('http://localhost:8080/ollama/prompt', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ file, query }),
		});

		if (!res.body) {
			throw new Error('No response body');
		}

		const reader = res.body.getReader();
		const decoder = new TextDecoder();

		if (!reader) throw new Error('No response body');

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			const chunk = decoder.decode(value, { stream: true });
			onData(chunk);
		}
	}
}
