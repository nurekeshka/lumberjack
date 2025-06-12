import {
	type AfterViewInit,
	Component,
	type ElementRef,
	computed,
	inject,
	signal,
	viewChildren,
} from '@angular/core';
import { FileService } from '../../data/file.service';
import { NlpService } from '../../data/nlp.service';
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
export class LogsComponent implements AfterViewInit {
	private readonly files = inject(FileService);
	private readonly nlps = inject(NlpService);

	public timestamps = computed(() => this.files.timestamps);

	elements = viewChildren<ElementRef<HTMLElement>>('logs');
	waiting = signal(true);

	async change(file: File): Promise<void> {
		await this.files.change(file);
		this.waiting.set(false);
	}

	ngAfterViewInit(): void {
		this.files.observable.subscribe((message: string) => {
			const date = this.nlps.date(message);
			if (!date) return;

			const timestamp = date.getTime();

			for (const datetime of this.timestamps().keys()) {
				if (timestamp === datetime) {
					const el = document.getElementById(datetime.toString());
					return el
						? el.scrollIntoView({
								behavior: 'smooth',
								block: 'center',
							})
						: el;
				}
			}

			for (const code of this.elements()) {
				const datetime = RegExp(/\[([^\]]+)\]/).exec(
					code.nativeElement.textContent ?? '',
				);

				if (!datetime) {
					continue;
				}

				const logs = this.nlps.date(datetime[1]);

				if (!logs) return;

				if (Math.abs(timestamp - logs.getTime()) <= 3 * 60 * 1000)
					code.nativeElement.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
					});
			}
		});
	}
}
