import type { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./layout/editor/editor.component').then((c) => c.EditorComponent),
	},
];
