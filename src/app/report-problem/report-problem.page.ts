import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { UserService } from '../services/user/user.service';
import { config } from '../config';

@Component({
  selector: 'app-report-problem',
  templateUrl: './report-problem.page.html',
  styleUrls: ['./report-problem.page.scss'],
})
export class ReportProblemPage implements OnInit {
message:any;
content:any;
errors:any=['',null,undefined];
is_loaded:boolean=false;
is_mobile_app:any = config.IS_MOBILE_APP;

  constructor(private emailComposer: EmailComposer,public userService: UserService) { 
    this.get_page_content();
  }

  ngOnInit() {
  }

  get_page_content(){
    this.userService.presentLoading();
    this.userService.postData({name : 'contactus'},'get_page_content').subscribe((result) => {
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

  sendEmail(){
  	if(this.errors.indexOf(this.message) == -1){
  		var my_message = this.message;
      var to_mail = this.content.email;
      var subject = 'Contact us - Nite Owl';
      var message_body = 'Hello team,%0D%0A'+my_message;
	  	this.message = '';
  		let email = {
  		  to: to_mail,
  		  subject: subject,
  		  body: message_body,
  		  isHtml: true
  		}

      if(this.is_mobile_app == 'true'){
        this.emailComposer.open(email);
      }
      else{
          window.open('mailto:?to='+to_mail+'&subject='+subject+'&body='+message_body, '_blank');

    	}
    }
  	else{
  		this.userService.presentToast('Please enter your query','danger');
  	}
  }

}
