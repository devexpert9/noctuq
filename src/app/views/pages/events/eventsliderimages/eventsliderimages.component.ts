import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'kt-eventsliderimages',
  templateUrl: './eventsliderimages.component.html',
  styleUrls: ['./eventsliderimages.component.scss']
})
export class EventsliderimagesComponent implements OnInit {

 constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
open(content) {
        this.modalService.open(content).result.then((result) => {       
        });
    }
}
