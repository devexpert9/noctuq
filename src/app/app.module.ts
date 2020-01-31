import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { CustomRequestOptions } from './services/CustomRequestOptions';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
// import { GoogleMaps } from "@ionic-native/google-maps/ngx";
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { VideoCapturePlus } from '@ionic-native/video-capture-plus/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { NgxStarsModule } from 'ngx-stars'; 
import { Geolocation } from '@ionic-native/geolocation/ngx';


import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider,FacebookLoginProvider } from "angular-6-social-login";

import { FiltersPage } from './filters/filters.page';
import { HeaderPage } from './header/header.page';
import { RatingPage } from './rating/rating.page';

import { socket_config, social_config } from './config';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
const config: SocketIoConfig = { url: socket_config.SOCKET_URL, options: {} };

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider(social_config.FACEBOOK_ID)
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(social_config.GOOLGLE_CLIENT_ID)
        }
      ]
  );
  return config;
}

@NgModule({
  declarations: [AppComponent, FiltersPage, HeaderPage, RatingPage],
  entryComponents: [FiltersPage, HeaderPage, RatingPage], 
  imports: [
    BrowserModule,
    CommonModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpModule,
    FormsModule,
    NgxStarsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    StatusBar,
    SplashScreen,
	  SocialSharing,
    Facebook,
    GooglePlus,
    LaunchNavigator,
    // GoogleMaps,
    Camera,
    File,
    FilePath,
    ImagePicker,
    PhotoViewer,
    VideoCapturePlus,
    FileTransfer,
    StreamingMedia,
    EmailComposer,
    FCM,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: RequestOptions, useClass: CustomRequestOptions },
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
