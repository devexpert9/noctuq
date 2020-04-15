import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomeMapPage } from './home-map.page';
import { SharedModule } from '../shared/shared.module';
import { AgmCoreModule } from '@agm/core';

const routes: Routes = [
  {
    path: '',
    component: HomeMapPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAIkAmlsGxoP63HLptMlKqpbgAv7IZBKM4',
      libraries: ['places']
    })
  ],
  declarations: [HomeMapPage]
})
export class HomeMapPageModule {}
