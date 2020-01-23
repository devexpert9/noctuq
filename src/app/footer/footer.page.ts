import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.page.html',
  styleUrls: ['./footer.page.scss'],
})
export class FooterPage implements OnInit {
current_year:any;
  constructor() {
  	var current = new Date();
  	this.current_year = current.getFullYear();
  }

  ngOnInit() {
  }

}
