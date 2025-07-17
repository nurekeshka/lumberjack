import * as chrono from 'chrono-node';

export class NlpConnector {
	dates(phrase: string): Date | null {
		return chrono.parseDate(phrase);
	}
}
