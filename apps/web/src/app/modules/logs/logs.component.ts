import { Component, inject, signal } from '@angular/core';
import { FileService } from '../../data/file.service';
import { ButtonComponent } from './components/elements/button/button.component';

@Component({
	selector: 'app-logs',
	imports: [ButtonComponent],
	templateUrl: './logs.component.html',
	styleUrl: './logs.component.scss',
	host: {
		class:
			'd-flex flex-column border-left justify-content-center align-items-center',
	},
})
export class LogsComponent {
	private readonly files = inject(FileService);
	public lines: string[] = [];

	waiting = signal(true);

	async change(file: File): Promise<void> {
		this.files.change(file);
		this.waiting.set(false);
		const plain = await this.files.receive();
		this.lines = plain.split('\n');
	}
}
