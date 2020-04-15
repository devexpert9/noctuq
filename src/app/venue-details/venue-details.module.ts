import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VenueDetailsPage } from './venue-details.page';
import { SharedModule } from '../shared/shared.module';
import { NgxStarsModule } from 'ngx-stars';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
const routes: Routes = [
  {
    path: '',
    component: VenueDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NgxStarsModule,
    ShareButtonsModule.forRoot(),
    RouterModule.forChild(routes),
    HttpClientModule,
    HttpClientJsonpModule
  ],
  declarations: [VenueDetailsPage]
})
export class VenueDetailsPageModule {}
