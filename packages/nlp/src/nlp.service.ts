import nlp from 'compromise';
import dates from 'compromise-dates';

export class NlpService {
	main() {
		nlp.plugin(dates);
		const doc = nlp('Give me logs for 12th of May');
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		console.log((doc as any).dates().get(0));
	}
}
