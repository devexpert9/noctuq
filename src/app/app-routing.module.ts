import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/guard-user/auth-guard.service';
import { AuthGuardHostService } from './services/guard-host/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home-list',
    pathMatch: 'full'
  },
  { path: 'login-host', loadChildren: './login-host/login-host.module#LoginHostPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'login/:type', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'forgotpassword', loadChildren: './forgotpassword/forgotpassword.module#ForgotpasswordPageModule' },
  { path: 'home-list', loadChildren: './home-list/home-list.module#HomeListPageModule', canActivate: [AuthGuardService] },
  { path: 'home-list/:type', loadChildren: './home-list/home-list.module#HomeListPageModule', canActivate: [AuthGuardService] },
  { path: 'home-map', loadChildren: './home-map/home-map.module#HomeMapPageModule', canActivate: [AuthGuardService] },
  { path: 'home-map/:type', loadChildren: './home-map/home-map.module#HomeMapPageModule', canActivate: [AuthGuardService] },
  { path: 'clubs/:id', loadChildren: './clubs/clubs.module#ClubsPageModule', canActivate: [AuthGuardService] },
  { path: 'venue-comments/:id', loadChildren: './vanue-comments/vanue-comments.module#VanueCommentsPageModule', canActivate: [AuthGuardService] },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule', canActivate: [AuthGuardService] },
  { path: 'friends', loadChildren: './friends/friends.module#FriendsPageModule', canActivate: [AuthGuardService] },
  { path: 'live-feed/:id', loadChildren: './live-feed/live-feed.module#LiveFeedPageModule', canActivate: [AuthGuardService] },
  { path: 'map/:id', loadChildren: './map/map.module#MapPageModule', canActivate: [AuthGuardService] },
  { path: 'public-profile/:id', loadChildren: './public-profile/public-profile.module#PublicProfilePageModule', canActivate: [AuthGuardService] },
  { path: 'chat/:id', loadChildren: './chat/chat.module#ChatPageModule', canActivate: [AuthGuardService] },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule', canActivate: [AuthGuardService] },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule', canActivate: [AuthGuardService] },
  { path: 'terms-privacy', loadChildren: './terms-privacy/terms-privacy.module#TermsPrivacyPageModule', canActivate: [AuthGuardService] },
  { path: 'report-problem', loadChildren: './report-problem/report-problem.module#ReportProblemPageModule', canActivate: [AuthGuardService] },
  { path: 'feed-gallery/:id', loadChildren: './feed-gallery/feed-gallery.module#FeedGalleryPageModule', canActivate: [AuthGuardService] },
  { path: 'make-live-feed/:id', loadChildren: './make-live-feed/make-live-feed.module#MakeLiveFeedPageModule', canActivate: [AuthGuardService] },
  { path: 'verify/:id', loadChildren: './verify-account/verify-account.module#VerifyAccountPageModule' },
  { path: 'rating', loadChildren: './rating/rating.module#RatingPageModule' },
  { path: 'host-events', loadChildren: './host-events/host-events.module#HostEventsPageModule', canActivate: [AuthGuardHostService] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
