import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
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
import { GoogleMaps } from "@ionic-native/google-maps/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [], 
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
	  SocialSharing,
    Facebook,
    GooglePlus,
    LaunchNavigator,
    GoogleMaps,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: RequestOptions, useClass: CustomRequestOptions }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
