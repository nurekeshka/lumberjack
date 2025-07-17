import { Component } from '@angular/core';
import { ConversationComponent } from '../../modules/conversation/conversation.component';
import { LogsComponent } from '../../modules/logs/logs.component';

@Component({
	selector: 'app-editor',
	imports: [ConversationComponent, LogsComponent],
	templateUrl: './editor.component.html',
	styleUrl: './editor.component.scss',
	host: { class: 'd-flex w-100 h-100' },
})
export class EditorComponent {}
