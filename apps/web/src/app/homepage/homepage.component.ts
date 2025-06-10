import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { OllamaResponse } from '@packages/contract';
import { HomepageService } from './homepage.service';

export interface Message {
	message: string;
	role: 'user' | 'system';
}

@Component({
	selector: 'app-homepage',
	imports: [ReactiveFormsModule],
	templateUrl: './homepage.html',
	styleUrl: './homepage.scss',
})
export class Homepage {
	private readonly service = inject(HomepageService);
	public readonly textarea = new FormControl({ value: '', disabled: false });
	public readonly loading = signal(false);
	public readonly messages = signal<Message[]>([
		{
			message: 'Hello! How can I help you?',
			role: 'system',
		},
	]);

	private file = '';

	next() {
		if (!this.textarea.value || !this.file) return;

		this.loading.set(true);
		const message = this.textarea.value;
		this.push({ message, role: 'user' });
		this.textarea.setValue('');

		this.service.send(message, this.file).subscribe({
			next: (response: OllamaResponse) => {
				this.push({
					message: response.message,
					role: 'system',
				});
			},
			error: (error) => {
				this.push({
					message: 'Sorry, something went wrong. Please try again.',
					role: 'system',
				});
				console.error('Error:', error);
			},
			complete: () => {
				this.loading.set(false);
			},
		});
	}

	interaction(event: Event): void {
		const element = event.target as HTMLTextAreaElement;
		this.textarea.setValue(element.value);
	}

	push(message: Message): void {
		this.messages.set([...this.messages(), message]);
	}

	upload(event: Event): void {
		const element = event.target as HTMLInputElement;
		const files = element.files;

		if (!files) return;

		const file = files[0];
		const reader = new FileReader();

		reader.onload = () => {
			const text = reader.result as string | null;
			if (!text) return;
			this.file = text;
		};

		reader.readAsText(file);
	}
}
