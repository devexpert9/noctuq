import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/guard-user/auth-guard.service';
import { AuthGuardHostService } from './services/guard-host/auth-guard.service';
import { GuardLoginService } from './services/guardLogin/guard-login.service';
 var login_type = localStorage.getItem('userType')
 var redirection = login_type == 'user' ? 'home-list' : 'host-events';
console.log(redirection);
const routes: Routes = [
  {
    path: '',
    redirectTo :redirection,
    pathMatch: 'full'
  },
  { path: 'host-events', loadChildren: './host-events/host-events.module#HostEventsPageModule', canActivate: [AuthGuardHostService] },
  { path: 'login-host', loadChildren: './login-host/login-host.module#LoginHostPageModule' , canActivate: [GuardLoginService] },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' , canActivate: [GuardLoginService]},
  { path: 'login/:type', loadChildren: './login/login.module#LoginPageModule' , canActivate: [GuardLoginService] },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'forgotpassword/:type', loadChildren: './forgotpassword/forgotpassword.module#ForgotpasswordPageModule' },
  { path: 'home-list', loadChildren: './home-list/home-list.module#HomeListPageModule', canActivate: [AuthGuardService] },
  { path: 'home-list/:type', loadChildren: './home-list/home-list.module#HomeListPageModule', canActivate: [AuthGuardService] },
  { path: 'home-map', loadChildren: './home-map/home-map.module#HomeMapPageModule', canActivate: [AuthGuardService] },
  { path: 'home-map/:type', loadChildren: './home-map/home-map.module#HomeMapPageModule', canActivate: [AuthGuardService] },
  { path: 'clubs/:id', loadChildren: './clubs/clubs.module#ClubsPageModule' },
  { path: 'venue-comments/:id', loadChildren: './vanue-comments/vanue-comments.module#VanueCommentsPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule', canActivate: [AuthGuardService] },
  { path: 'friends', loadChildren: './friends/friends.module#FriendsPageModule', canActivate: [AuthGuardService] },
  { path: 'live-feed/:id', loadChildren: './live-feed/live-feed.module#LiveFeedPageModule', canActivate: [AuthGuardService] },
  { path: 'map/:id', loadChildren: './map/map.module#MapPageModule' },
  { path: 'public-profile/:id', loadChildren: './public-profile/public-profile.module#PublicProfilePageModule', canActivate: [AuthGuardService] },
  { path: 'chat/:id', loadChildren: './chat/chat.module#ChatPageModule', canActivate: [AuthGuardService] },
  { path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule', canActivate: [AuthGuardService] },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'terms-privacy', loadChildren: './terms-privacy/terms-privacy.module#TermsPrivacyPageModule' },
  { path: 'report-problem', loadChildren: './report-problem/report-problem.module#ReportProblemPageModule' },
  { path: 'feed-gallery/:id', loadChildren: './feed-gallery/feed-gallery.module#FeedGalleryPageModule' },
  { path: 'make-live-feed/:id', loadChildren: './make-live-feed/make-live-feed.module#MakeLiveFeedPageModule', canActivate: [AuthGuardService] },
  { path: 'verify/:id', loadChildren: './verify-account/verify-account.module#VerifyAccountPageModule' },
  { path: 'rating', loadChildren: './rating/rating.module#RatingPageModule' },
  { path: 'add-event', loadChildren: './add-event/add-event.module#AddEventPageModule', canActivate: [AuthGuardHostService] },
  { path: 'edit-event/:id', loadChildren: './add-event/add-event.module#AddEventPageModule', canActivate: [AuthGuardHostService] },
  { path: 'host-profile', loadChildren: './host-profile/host-profile.module#HostProfilePageModule', canActivate: [AuthGuardHostService] },
  { path: 'messages', loadChildren: './my-chats/my-chats.module#MyChatsPageModule', canActivate: [AuthGuardService] },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule', canActivate: [AuthGuardService] },
  { path: 'add-venue', loadChildren: './add-venue/add-venue.module#AddVenuePageModule' , canActivate: [AuthGuardHostService] },
  { path: 'edit-venue/:id', loadChildren: './add-venue/add-venue.module#AddVenuePageModule' , canActivate: [AuthGuardHostService] },
  { path: 'venues/:id', loadChildren: './venue-details/venue-details.module#VenueDetailsPageModule' },
  { path: 'change-password', loadChildren: './change-password/change-password.module#ChangePasswordPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
