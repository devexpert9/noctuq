import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClubsPage } from './clubs.page';
import { SharedModule } from '../shared/shared.module';
import { NgxStarsModule } from 'ngx-stars';

const routes: Routes = [
  {
    path: '',
    component: ClubsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NgxStarsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClubsPage]
})
export class ClubsPageModule {}
