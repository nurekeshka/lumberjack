import { Component, output } from '@angular/core';

@Component({
	selector: 'app-button',
	imports: [],
	templateUrl: './button.component.html',
	styleUrl: './button.component.scss',
})
export class ButtonComponent {
	public readonly title = 'Your logs file, please';

	onchange = output<File>();

	change(event: Event): void {
		const element = event.target as HTMLInputElement;
		const files = element.files;
		files && this.onchange.emit(files[0]);
	}
}
