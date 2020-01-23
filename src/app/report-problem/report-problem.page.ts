import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { UserService } from '../services/user/user.service';

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
	  	this.message = '';
		let email = {
		  to: 'info@niteowl.com',
		  subject: 'Contact us - Nite Owl',
		  body: '<p>Hello team,</p><p>'+my_message+'</p>',
		  isHtml: true
		}

    // if(this.)

    // javascript:window.location='mailto:?subject=Interesting information&body=I thought you might find this information interesting: ' + window.location;"

		// Send a text message using default options
		this.emailComposer.open(email);
  	}
  	else{
  		this.userService.presentToast('Please enter your query','danger');
  	}
  }

}
