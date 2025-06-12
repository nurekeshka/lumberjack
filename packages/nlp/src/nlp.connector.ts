import * as chrono from 'chrono-node';
import nlp from 'compromise';
import dates from 'compromise-dates';
import type { DatesMethods } from 'compromise-dates';

export class NlpConnector {
	private readonly nlp: typeof nlp<DatesMethods>;

	constructor() {
		this.nlp = nlp;
		this.nlp.plugin(dates);
	}

	dates(phrase: string): Date | null {
		return chrono.parseDate(phrase);
	}
}
