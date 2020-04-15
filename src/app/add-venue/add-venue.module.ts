import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddVenuePage } from './add-venue.page';
import { NgxGeoautocompleteModule } from 'ngx-geoautocomplete';
import { SharedModule } from '../shared/shared.module';
import { FileUploadModule } from "ng2-file-upload";
const routes: Routes = [
  {
    path: '',
    component: AddVenuePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxGeoautocompleteModule.forRoot(),
    SharedModule,
    FileUploadModule
  ],
  declarations: [AddVenuePage]
})
export class AddVenuePageModule {}
