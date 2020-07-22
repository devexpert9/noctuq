import { Component } from '@angular/core';
import { MenuController, Platform, Events } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationEnd } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import { config } from './config';
import { UserService } from './services/user/user.service';
import { filter } from 'rxjs/operators';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { EventService } from './services/event/event.service';
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
  new_message:any;
  current_url:any;
  userId:any;
  messages:any=0;
  notifications:any=0;
  res_came:boolean=false;
  public appPages = [
    {
      title: 'Home',
      url: '/home-list',
      icon: 'assets/img/home.png',
      type:0
    },
    {
      title: 'Favorites',
      url: '/home-list/favorites',
      icon: 'assets/img/heart.png',
      type:0
    },
    {
      title: 'Messages',
      url: '/messages',
      icon: 'assets/img/messages.png',
      badge:this.messages,
      type:1
    },
    {
      title: 'Notifications',
      url: '/notifications',
      icon: 'assets/img/notification-solid.png',
      badge:this.notifications,
      type:2
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'assets/img/person-icon.jpeg',
      type:0
    },
    {
      title: 'About <b> Noctuq </b>',
      url: '/about',
      icon: 'assets/img/about.png',
      type:0
    },
    {
      title: 'Terms/Privacy Policy',
      url: '/terms-privacy',
      icon: 'assets/img/person.png',
      type:0
    },
    {
      title: 'Report A Problem',
      url: '/report-problem',
      icon: 'assets/img/problem.png',
      type:0
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'assets/img/settings-icon.png',
      type:0
    }
  ];

  constructor(public events1: EventService,
    private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar, private menu: MenuController, private router: Router,private fcm: FCM, public events:Events, public userService:UserService, private socket: Socket)
     {
      this.initializeApp();
      events.subscribe('user_log_activity:true', data => {
        this.checkUserAuth();
        this.get_Messages();
        this.get_Notifications();
      });
      this.no_header_pages = ['/login','/login-host','/signup','/forgotpassword/user','/forgotpassword/host','/login/host'];

      // socket call
      this.getUpdates().subscribe(new_message => {
        this.new_message = new_message;
        if(this.new_message.userId == this.userId){
          this.logout();
        }
      });
      

      this.get_Messages();
      this.get_Notifications();

      this.getMessages().subscribe(new_message => {
        this.events1.publishSomeData({});
        this.get_Messages();
      })

      this.getNotiUpdates().subscribe(new_message => {
        this.events1.publishSomeData({});
        this.get_Notifications();
      })

     
      events.subscribe('read_noti', data => {
        this.get_Notifications();
      
      });

      events.subscribe('read_msgs', data => {
        this.get_Messages();
        this.get_Notifications();
        this.events1.publishSomeData({});
        this.events.publish('test','');
        console.log('sendinggggggg')
        this.events1.publishSomeData({});
      });

      this.events1.publishSomeData({});

  }

  ngOnInit(){
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.current_url = event.url;
      console.log(' this.current_url', this.current_url)
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
    this.userId = userId;
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

  getUpdates() {
    var self = this;
    let observable = new Observable(observer => {
      self.socket.on('rec_deactivate_user', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  getNotiUpdates() {
    var self = this;
    let observable = new Observable(observer => {
      self.socket.on('rec_notification', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  logout(){
    localStorage.removeItem('userType');
    localStorage.removeItem('niteowl_auth_token');
    localStorage.removeItem('niteowl_sessions');
    this.closeMenu();
    var self = this;
    setTimeout(function(){
      self.isLoggedIn = false;
      self.router.navigate(['/login']);
    },500);
  }

  getMessages() {

    var self = this;
    let observable = new Observable(observer => {
      self.socket.on('rec_message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }


  get_Messages() {
       //get messages//
       var token = localStorage.getItem('niteowl_auth_token');
       var userId = this.userService.decryptData(token,config.ENC_SALT);
      
         this.userService.postData({userId:userId},'get_unread_messages').subscribe((result) => {
           var res;
           res= result;
           if(result.status == 1){
           this.messages= result.data ;
           this.res_came=true;
           
           
           }else{
           this.messages= null;
           this.res_came=true;


           }
          
         },
         err => {
    
         });
  }


  get_Notifications() {
    //get messages//
    var token = localStorage.getItem('niteowl_auth_token');
    var userId = this.userService.decryptData(token,config.ENC_SALT);
   
      this.userService.postData({userId:userId},'get_unread_notifications').subscribe((result) => {
        var res;
        res= result;
        if(result.status == 1){
        this.notifications= result.data ;
        this.res_came=true;
      
        
        }else{
          this.notifications= null ;
          this.res_came=true;

        }
       
      },
      err => {
 
      });
}



}
