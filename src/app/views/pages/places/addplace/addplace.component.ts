import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService } from '@syncfusion/ej2-angular-richtexteditor';
@Component({
  selector: 'kt-addplace',
  templateUrl: './addplace.component.html',
  styleUrls: ['./addplace.component.scss']
})
export class AddplaceComponent implements OnInit {
	 checked = true;
  indeterminate = false;
     public tools: object = {
         items: [
                'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
                'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
                'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
                'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
                'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
        }; 
		     public tools1: object = {
         items: [
                'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
                'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
                'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
                'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
                'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
        }; 
		     public tools2: object = {
         items: [
                'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
                'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
                'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
                'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
                'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
        }; 
		  public tools3: object = {
         items: [
                'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
                'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
                'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
                'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
                'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
        }; 
  constructor() { }

  ngOnInit() {
  }
    publicplaces = [
    {value: 'yes-0', viewValue: 'Yes'},
    {value: 'no-1', viewValue: 'No'}
  ];
  typeControl = new FormControl();
  typeGroups = [
  {
    name: 'Sleep',
    type: [
    { value: 'hotel-0', viewValue: 'Hotels & Parts' },
    { value: 'cabin-1', viewValue: 'Cabins' },
    { value: 'house-2', viewValue: 'House' }
  ]
  },
  {
    name: 'Eat',
    type: [
    { value: 'restaurants-0', viewValue: 'Restaurants' },
    { value: 'pizzerias-1', viewValue: 'Pizzerias' },
    { value: 'bars-2', viewValue: 'Bars' }
  ]
  },
  {
    name: 'Fun',
    type: [
      { value: 'sightseeing-0', viewValue: 'Sightseeing Tours' },
    { value: 'nightlife-1', viewValue: 'Nightlife' },
    { value: 'excursions-2', viewValue: 'Excursions' }
  ]
  },
  {
    name: 'Services',
    type: [
     { value: 'municipal-0', viewValue: 'Municipal' },
    { value: 'transport-1', viewValue: 'Transport' }
  ]
  },
  {
    name: 'Buy',
    type: [
    { value: 'supermarkets-0', viewValue: 'Supermarkets' },
    { value: 'butchers-1', viewValue: 'Butchers' }
  ]
  }
  ];
}
