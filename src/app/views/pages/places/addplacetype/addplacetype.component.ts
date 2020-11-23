import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'kt-addplacetype',
  templateUrl: './addplacetype.component.html',
  styleUrls: ['./addplacetype.component.scss']
})
export class AddplacetypeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
 types = new FormControl('');
}
