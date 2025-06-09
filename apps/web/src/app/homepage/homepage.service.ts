import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';

export interface OllamaResponse {
	message: string;
}

@Injectable({ providedIn: 'root' })
export class HomepageService {
	private readonly http = inject(HttpClient);

	send(query: string): Observable<OllamaResponse> {
		return this.http.post<OllamaResponse>(
			'http://localhost:8080/ollama/prompt',
			{
				file: 'Just answer the question below',
				query,
			},
		);
	}
}
