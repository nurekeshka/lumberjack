export type NlpDates = {
	start: string;
	end: string;
	timezone: string;
	duration: {
		years: number;
		month: number;
		days: number;
		hours: number;
		minutes: number;
	};
};
