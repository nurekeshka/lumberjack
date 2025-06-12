import { NlpService } from './nlp.service';

describe('NlpService', () => {
	it('main', () => {
		const nlp = new NlpService();
		nlp.main();
	});
});
