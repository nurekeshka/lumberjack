import type { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./homepage/homepage.component').then((c) => c.Homepage),
	},
];
