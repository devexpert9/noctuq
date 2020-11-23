import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
  selector: 'kt-editplacetype',
  templateUrl: './editplacetype.component.html',
  styleUrls: ['./editplacetype.component.scss']
})
export class EditplacetypeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
 types = new FormControl('eat');
}
