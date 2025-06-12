import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import type { OllamaResponse } from '@packages/contract';
import { ApiService } from '../../data/api.service';
import { FileService } from '../../data/file.service';

export interface Message {
	message: string;
	role: 'user' | 'system';
}

@Component({
	selector: 'app-conversation',
	imports: [ReactiveFormsModule],
	templateUrl: './conversation.component.html',
	styleUrl: './conversation.component.scss',
	host: { class: 'd-flex flex-column border-end' },
})
export class ConversationComponent {
	private readonly connector = inject(ApiService);
	private readonly files = inject(FileService);

	public readonly textarea = new FormControl({ value: '', disabled: false });
	public readonly loading = signal(false);
	public readonly messages = signal<Message[]>([
		{
			message: 'Hello! How can I help you?',
			role: 'system',
		},
	]);

	async next() {
		const file = this.files.plain.join('\n');

		if (!this.textarea.value || !file) return;

		this.loading.set(true);
		const message = this.textarea.value;
		this.files.locate(message);

		this.push({ message, role: 'user' });
		this.textarea.setValue('');

		this.connector.next(message, file).subscribe({
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
}
