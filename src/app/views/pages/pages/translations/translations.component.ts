import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
@Component({
  selector: 'kt-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss']
})
export class TranslationsComponent implements OnInit {
displayedColumns = [ 'translation' , 'en', 'pt'  ,'action'];
dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  constructor() { }
 applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  ngOnInit() {
  }

}
export interface Element {
  translation: string;
  translationen: string;
  translationpt: string;
  en: string;
  pt: string;
}
const ELEMENT_DATA: Element[] = [
  {
	  translation: ' aboutus '  , translationen: 'About Us' ,  translationpt: 'Sobre Nós' ,  en: '√' ,  pt: '√'
  }
  ,
    {
	  translation: ' actions-admin '  , translationen: 'Actions' ,  translationpt: 'Ações' , en: '√' ,  pt: '√'
  },
    {
	  translation: ' activate-admin '  , translationen: 'Activate' ,  translationpt: 'Ativar' ,   en: '√' ,  pt: '√'
  },
    {
	  translation: ' add-another-admin ' , translationen: 'Add another link' ,  translationpt: 'Adicionar outro' ,  en: '√' ,  pt: '√'
  },
    {
	  translation: 'address-admin '  ,  translationen: 'Address' ,  translationpt: 'Endereço' ,  en: '√' ,  pt: '√'
  },
    {
	  translation: ' add_place_admin '   , translationen: 'Add Place ' ,  translationpt: 'Adicionar local' ,  en: '√' ,  pt: '√'
  },
    {
	  translation: ' admin-edit-question ' , translationen: ' Edit question' ,  translationpt: 'Editar pergunta' ,  en: '√' ,  pt: '√'
  }
  
];