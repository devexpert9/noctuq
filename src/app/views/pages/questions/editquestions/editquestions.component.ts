import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'kt-editquestions',
  templateUrl: './editquestions.component.html',
  styleUrls: ['./editquestions.component.scss']
})
export class EditquestionsComponent implements OnInit {
selected = new FormControl('accomodation');
selected2 = new FormControl('hotel');
selected3 = new FormControl('hotel1');
  constructor() { }

  ngOnInit() {
  }

}
