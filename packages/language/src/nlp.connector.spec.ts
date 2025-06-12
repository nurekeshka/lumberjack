import { NlpConnector } from './nlp.connector';

describe('NlpService', () => {
	it('dates', () => {
		const nlp = new NlpConnector();
		expect(
			nlp.dates(
				'Give me the logs which start on 8th of June and end 9th of June',
			),
		).toBeTruthy();
	});
});
