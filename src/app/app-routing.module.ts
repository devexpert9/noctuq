import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home-list',
    pathMatch: 'full'
  },
  { path: 'login-host', loadChildren: './login-host/login-host.module#LoginHostPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'forgotpassword', loadChildren: './forgotpassword/forgotpassword.module#ForgotpasswordPageModule' },
  { path: 'home-list', loadChildren: './home-list/home-list.module#HomeListPageModule', canActivate: [AuthGuardService] },
  { path: 'home-list/:type', loadChildren: './home-list/home-list.module#HomeListPageModule', canActivate: [AuthGuardService] },
  { path: 'home-map', loadChildren: './home-map/home-map.module#HomeMapPageModule', canActivate: [AuthGuardService] },
  { path: 'home-map/:type', loadChildren: './home-map/home-map.module#HomeMapPageModule', canActivate: [AuthGuardService] },
  { path: 'clubs/:id', loadChildren: './clubs/clubs.module#ClubsPageModule', canActivate: [AuthGuardService] },
  { path: 'vanue-comments', loadChildren: './vanue-comments/vanue-comments.module#VanueCommentsPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule', canActivate: [AuthGuardService] },
  { path: 'friends', loadChildren: './friends/friends.module#FriendsPageModule' },
  { path: 'live-feed', loadChildren: './live-feed/live-feed.module#LiveFeedPageModule' },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' },
  { path: 'public-profile', loadChildren: './public-profile/public-profile.module#PublicProfilePageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'terms-privacy', loadChildren: './terms-privacy/terms-privacy.module#TermsPrivacyPageModule' },
  { path: 'report-problem', loadChildren: './report-problem/report-problem.module#ReportProblemPageModule' },
  { path: 'feed-gallery', loadChildren: './feed-gallery/feed-gallery.module#FeedGalleryPageModule' },
  { path: 'make-live-feed', loadChildren: './make-live-feed/make-live-feed.module#MakeLiveFeedPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
