import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TimeAgoPipe } from 'time-ago-pipe';
import { FooterPage } from '../footer/footer.page';

@NgModule({
  imports: [
  	CommonModule,
  	IonicModule.forRoot(),
  	RouterModule,
  	FormsModule,
  ],
  declarations: [
     TimeAgoPipe,
     FooterPage
  ],
  exports: [
     TimeAgoPipe,
     FooterPage
  ]
})

export class SharedModule { }
 