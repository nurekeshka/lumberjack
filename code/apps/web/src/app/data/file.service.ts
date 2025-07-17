import { Injectable, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { NlpService } from './nlp.service';

@Injectable({ providedIn: 'root' })
export class FileService {
	private readonly subject = new Subject<string>();
	readonly observable = this.subject.asObservable();

	private readonly nlps = inject(NlpService);

	file?: File;
	plain: string[] = [];

	readonly timestamps: Map<number, string[]> = new Map();

	change(file: File): Promise<void> {
		return new Promise((resolve, reject) => {
			this.file = file;

			const service = new FileReader();

			service.onload = () => {
				this.plain = (service.result as string).split('\n');

				for (const line of this.plain) {
					const source = line;

					if (!source) continue;

					const date = this.nlps.date(line);
					if (!date) continue;

					const timestamp = date.getTime();

					if (!this.timestamps.has(timestamp))
						this.timestamps.set(timestamp, []);

					this.timestamps.get(timestamp)?.push(line);
				}

				resolve();
			};

			service.onerror = reject;
			service.readAsText(file);
		});
	}

	locate(message: string): void {
		this.subject.next(message);
	}
}
