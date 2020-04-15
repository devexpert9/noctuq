import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
content:any;
errors:any=['',null,undefined];
is_loaded:boolean=false;
  constructor(public userService: UserService) { 
  	this.get_page_content();
  }

  ngOnInit() {
  }

  get_page_content(){
    this.userService.presentLoading();
    this.userService.postData({name : 'aboutus'},'get_page_content').subscribe((result) => {
      this.is_loaded = true;
      this.userService.stopLoading();
      this.content = result;
    },
    err => {
      this.is_loaded = true;
      this.userService.stopLoading();
      this.userService.presentToast('Unable to get content, Please try again','danger');
    });
  }


}
