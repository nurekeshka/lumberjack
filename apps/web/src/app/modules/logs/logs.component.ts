import { Component, inject } from '@angular/core';
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

	change(file: File): void {
		this.files.change(file);
	}
}
