import { Injectable } from '@angular/core';
import { NlpConnector } from '@packages/language';

@Injectable({ providedIn: 'root' })
export class NlpService {
	private readonly nlp = new NlpConnector();

	date(phrase: string): Date | null {
		return this.nlp.dates(phrase);
	}
}
