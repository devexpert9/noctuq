import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams} from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { config } from '../config';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
errors:any=['',null,undefined];
is_submit:boolean=false;
old_password:any;
new_password:any;
confirm_password:any;
userId:any;
user_type:any;
  constructor(public modalController: ModalController, public userService: UserService, public navParams: NavParams) { 
  	this.user_type = navParams.get('user_type');
  	this.userId = navParams.get('userId');
  }

  ngOnInit() {
  }

  closeModal(data={}){
    this.modalController.dismiss(data);
  }

  change_pass(){
  	this.is_submit = true;
    if(this.errors.indexOf(this.old_password) >= 0 || this.errors.indexOf(this.new_password) >= 0 || this.errors.indexOf(this.confirm_password) >= 0 || (this.new_password != this.confirm_password) || this.new_password.length < 6 ){
      return false;
    }
    var dict = {
    	userId : this.userId,
    	old_password : this.old_password,
    	new_password : this.new_password,
    	type : this.user_type
    }

    this.userService.presentLoading();
    this.userService.postData(dict, 'change_password').subscribe((result) => {
      this.userService.stopLoading();
      if(result.status == 1){
      	this.userService.presentToast('Password updated successfully.','success');
      	var data = {success : 1};
      	this.closeModal(data);
      }
      else if(result.status == 2){
      	this.userService.presentToast('Old password is incorrect.','danger');
      }
      else{
      	this.userService.presentToast('Error while updating password, Please try later.','danger');
      }
  	},
    err => {
      this.userService.stopLoading();
      this.userService.presentToast('Error while updating password, Please try later.','danger');
    });
  }

}
