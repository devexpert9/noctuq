// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{path: '', loadChildren: () => import('app/views/pages/auth/auth.module').then(m => m.AuthModule)},
	{path: 'panel', loadChildren: () => import('app/views/themes/demo1/theme.module').then(m => m.ThemeModule)},
	{path: '**', redirectTo: 'panel/error/403', pathMatch: 'full'},
	
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes,{ useHash: true })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
