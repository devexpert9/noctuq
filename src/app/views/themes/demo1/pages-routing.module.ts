// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './base/base.component';
import { ErrorPageComponent } from './content/error-page/error-page.component';
// Auth
import { AuthGuard } from '../../../core/auth';

const routes: Routes = [
	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
		    {
				path: 'profile',
				loadChildren: () => import('app/views/pages/adminprofile/adminprofile.module').then(m => m.AdminprofileModule)
			},
			{
				path: 'dashboard',
				loadChildren: () => import('app/views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'users',
				loadChildren: () => import('app/views/pages/users/users.module').then(m => m.UsersModule)
			},
			//{
			//	path: 'places',
			//	loadChildren: () => import('app/views/pages/places/places.module').then(m => m.PlacesModule)
			//},	
			{
				path: 'events',
				loadChildren: () => import('app/views/pages/events/events.module').then(m => m.EventsModule)
			},
			{
				path: 'hosts',
				loadChildren: () => import('app/views/pages/hosts/hosts.module').then(m => m.HostsModule)
			},
			{
				path: 'venues',
				loadChildren: () => import('app/views/pages/events/venues/venues.module').then(m => m.VenuesModule)
			},
			{
				path: 'venue_types',
				loadChildren: () => import('app/views/pages/events/venue.module').then(m => m.VenueModule)
			},
			{
				path: 'genre_types',
				loadChildren: () => import('app/views/pages/events/genre.module').then(m => m.GenreModule)
			},
			{
				path: 'categories',
				loadChildren: () => import('app/views/pages/categories/categories.module').then(m => m.CategoriesModule)
			},
			{
				path: 'questions',
				loadChildren: () => import('app/views/pages/questions/questions.module').then(m => m.QuestionsModule)
			},
			{
				path: 'pages',
				loadChildren: () => import('app/views/pages/pages/pages.module').then(m => m.PagesModule)
			},			
			{
				path: 'builder',
				loadChildren: () => import('app/views/themes/demo1/content/builder/builder.module').then(m => m.BuilderModule)
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					'type': 'error-v6',
					'code': 403,
					'title': '403... Access forbidden',
					'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{path: 'error/:type', component: ErrorPageComponent},
			{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
			{path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {
}
