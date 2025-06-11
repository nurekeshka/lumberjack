import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FileService {
	private file?: File;

	change(file: File): void {
		this.file = file;
	}

	receive(): Promise<string> {
		return new Promise((resolve, reject) => {
			const service = new FileReader();

			service.onload = () => {
				resolve(service.result as string);
			};

			service.onabort = () => {
				reject(Error("File can't be read"));
			};

			service.readAsText(this.file as File);
		});
	}
}
