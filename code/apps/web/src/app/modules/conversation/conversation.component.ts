import { Component, inject, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { ApiService } from "../../data/api.service";
import { FileService } from "../../data/file.service";

export interface Message {
	message: string;
	role: "user" | "system";
}

@Component({
	selector: "app-conversation",
	imports: [ReactiveFormsModule],
	templateUrl: "./conversation.component.html",
	styleUrl: "./conversation.component.scss",
	host: { class: "d-flex flex-column border-end" },
})
export class ConversationComponent {
	private readonly connector = inject(ApiService);
	private readonly files = inject(FileService);

	public readonly textarea = new FormControl({ value: "", disabled: false });
	public readonly loading = signal(false);
	public readonly messages = signal<Message[]>([
		{
			message: "Hello! How can I help you?",
			role: "system",
		},
	]);

	async streamChatResponse(prompt: string, onData: (text: string) => void) {
		const response = await fetch("http://localhost:3000/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ prompt }),
		});

		const reader = response.body?.getReader();
		const decoder = new TextDecoder();

		if (!reader) throw new Error("No response body");

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			const chunk = decoder.decode(value, { stream: true });
			onData(chunk); // Send streamed text to the component
		}
	}

	async next() {
		const file = this.files.plain.join("\n");

		if (!this.textarea.value || !file) return;

		this.loading.set(true);
		const message = this.textarea.value;
		this.files.locate(message);

		this.addMessage("user", message);
		this.textarea.setValue("");

		this.addMessage("system");

		await this.connector.next(message, file, (chunk) => {
			this.appendToLatest(chunk);
		});

		this.loading.set(false);
	}

	interaction(event: Event): void {
		const element = event.target as HTMLTextAreaElement;
		this.textarea.setValue(element.value);
	}

	appendToLatest(plain: string): void {
		const messages = this.messages();
		const latest = messages.pop();
		if (!latest) return;

		latest.message += plain;
		this.messages.set([...messages, latest]);
	}

	addMessage(role: Message["role"], message: string = ""): void {
		this.messages.set([...this.messages(), { message, role }]);
	}
}
