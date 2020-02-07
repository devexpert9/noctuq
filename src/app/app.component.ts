import { Component } from '@angular/core';
import { MenuController, Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationEnd } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import { config } from './config';
import { UserService } from './services/user/user.service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  IS_MOBILE_APP:any=config.IS_MOBILE_APP;
  isLoggedIn:boolean = false;
  errors:any = ['',null,undefined];
  no_header_pages:any;
  current_url:any;
  public appPages = [
    {
      title: 'Home',
      url: '/home-list',
      icon: 'assets/img/home.png'
    },
    {
      title: 'Favorites',
      url: '/home-list/favorites',
      icon: 'assets/img/heart.png'
    },
    {
      title: 'Messages',
      url: '/messages',
      icon: 'assets/img/messages.png'
    },
    {
      title: 'Notifications',
      url: '/notifications',
      icon: 'assets/img/notification-solid.png'
    },
    {
      title: 'About <b> Noctuq </b>',
      url: '/about',
      icon: 'assets/img/about.png'
    },
    {
      title: 'Terms/Privacy Policy',
      url: '/terms-privacy',
      icon: 'assets/img/person.png'
    },
    {
      title: 'Report A Problem',
      url: '/report-problem',
      icon: 'assets/img/problem.png'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'assets/img/settings-icon.png'
    }
  ];

  constructor(
    private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, private menu: MenuController, private router: Router,private fcm: FCM, public events:Events, public userService:UserService) {
      this.initializeApp();
      events.subscribe('user_log_activity:true', data => {
        this.checkUserAuth();
      });
      this.no_header_pages = ['/login','/login-host','/signup','/forgotpassword','/login/host'];
  }

  ngOnInit(){
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.current_url = event.url;
    });
  }

  ionViewWillUnload(){
    this.events.unsubscribe('user_log_activity:true');
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#222222');
      this.splashScreen.hide();
      this.checkUserAuth();
      if(this.IS_MOBILE_APP == 'true'){
        this.fcm.onNotification().subscribe(data => {
          console.log(data);
          if (data.wasTapped) {
            console.log('Received in background');
            this.router.navigate(['/friends']);
          } else {
            console.log('Received in foreground');
            if(data.type == '1'){
              this.userService.presentToast('You have new message from '+data.data,'success');
            }
            if(data.type == '2'){
              this.userService.presentToast('You have new friend request from '+data.data,'success');
            }
            if(data.type == '3'){
              this.userService.presentToast(data.data+' has accepted your friend request','success');
            }
            if(data.type == '4'){
              this.userService.presentToast(data.data+' has rejected your friend request','success');
            }
          }
        });
      }
    });
  }

  checkUserAuth(){
    var token = localStorage.getItem('niteowl_auth_token');
    var userId = this.userService.decryptData(token,config.ENC_SALT);
    if(this.errors.indexOf(userId) == -1 && userId != 0){
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
    }
  }

  closeMenu(){
    this.menu.close();
  }

  logout(){
    localStorage.removeItem('niteowl_auth_token');
    localStorage.removeItem('niteowl_sessions');
    this.closeMenu();
    var self = this;
    setTimeout(function(){
      self.isLoggedIn = false;
      self.router.navigate(['/login']);
    },500);
  }
}
