import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams} from '@ionic/angular';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.page.html',
  styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {
errors : any = ['',null,undefined];
all_genres:any;
all_venues:any;
venues:any=[];
genres:any=[];
mile_radius:any;
price_values:any;
min_price:any;
max_price:any;
price_limit:any;
  constructor(public modalController: ModalController, public navParams: NavParams) { 
    var filters = navParams.get('filters');
    this.genres = filters.genres;
    this.all_genres = filters.all_genres;
    this.all_venues = filters.all_venues;
    this.venues = filters.venues;
    this.min_price = filters.min_price;
    this.max_price = filters.max_price;
    this.price_limit = filters.price_limit;
    this.mile_radius = filters.mile_radius;
    this.price_values = {lower: this.min_price, upper: this.max_price};
  }

  ngOnInit() {
  }

  priceChanged(event){
    this.min_price = event.detail.value.lower;
    this.max_price = event.detail.value.upper;
    console.log('price')
    console.log(event.detail.value)
  }

  mileChanged(event){
    console.log('miles')
    console.log(event.detail.value)
  }

  
  venueChanged(event,val){
    var self = this;
    setTimeout(function(){
      if(self.venues.indexOf(val) == -1){
        self.venues.push(val);
      }
      else{
        self.venues.splice(self.venues.indexOf(val),1);
      }
      console.log(self.venues)
    },500);
  }

  genreChanged(event,val){
    var self = this;
    setTimeout(function(){
      if(self.genres.indexOf(val) == -1){
        self.genres.push(val);
      }
      else{
        self.genres.splice(self.genres.indexOf(val),1);
      }
      console.log(self.genres)
    },500);
  }

  closeModal(data={}){
    this.modalController.dismiss(data);
  }

  applyFilters(){
  	var data = {};
  	data['applied'] = '1';
    data['venues'] = this.venues;
    data['genres'] = this.genres;
    data['min_price'] = this.min_price;
    data['max_price'] = this.max_price;
    data['mile_radius'] = this.mile_radius;
  	this.closeModal(data);
  }

}
