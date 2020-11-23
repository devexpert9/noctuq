import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'kt-whattodo',
  templateUrl: './whattodo.component.html',
  styleUrls: ['./whattodo.component.scss']
})
export class WhattodoComponent implements OnInit {
  selected = new FormControl('option1');
  selected2 = new FormControl('option32');
  selected3 = new FormControl('option33');
  selected4 = new FormControl('option54');
  constructor() { }

  ngOnInit() {
  }

}
