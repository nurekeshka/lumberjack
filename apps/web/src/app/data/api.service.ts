import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import type { OllamaResponse } from '@packages/contract';
import { type Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
	private readonly http = inject(HttpClient);

	next(query: string, file: string): Observable<OllamaResponse> {
		return of({
			message:
				"The logs show that an Oracle Data Loader On Demand import job has been executed successfully. Here's a summary of the key events: 1. The import job started with the submission of the request using the provided Request Id (1QA2-Q5NU1...). 2. The data was split into one CSV Data Segment, which was processed by a thread. 3. The CSV Data Segment was successfully sent to the server and an acknowledgement was received. 4. Subsequent data segments were not mentioned in the logs, suggesting that there was only one segment for this import job. 5. The import job was completed, with the data being imported into Oracle successfully. 6. The Oracle session was logged out at the end of the process. In summary, the logs indicate a successful execution of an Oracle Data Loader On Demand import job.",
		});
		// return this.http.post<OllamaResponse>(
		// 	'http://localhost:8080/ollama/prompt',
		// 	{ file, query },
		// );
	}
}
