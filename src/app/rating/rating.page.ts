import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {
rating:number;
errors:any = ['',null,undefined];
  constructor(public modalController: ModalController, public userService:UserService) { }

  ngOnInit() {
  }

  closeModal(data=null){
  	this.modalController.dismiss(data);
  }

  onRatingSet(event){
  	this.rating = event;
  }

  rateIt(){
  	if(this.errors.indexOf(this.rating) == -1){
  		this.closeModal(this.rating);
  	}
  	else{
  		this.userService.presentToast('Please select rating.','danger');
  	}
  }

}
