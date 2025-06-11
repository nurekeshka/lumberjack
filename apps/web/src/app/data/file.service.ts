import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FileService {
	file?: File;

	change(file: File): void {
		this.file = file;
	}

	receive(): Promise<string> {
		return new Promise((resolve, reject) => {
			const service = new FileReader();

			service.onload = () => {
				resolve(service.result as string);
			};

			service.onerror = reject;
			service.readAsText(this.file as File);
		});
	}
}
