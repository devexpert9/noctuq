import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TimeAgoPipe } from 'time-ago-pipe';

@NgModule({
  imports: [
  	CommonModule,
  	IonicModule.forRoot(),
  	RouterModule,
  	FormsModule,
  ],
  declarations: [
     TimeAgoPipe
  ],
  exports: [
     TimeAgoPipe
  ]
})

export class SharedModule { }
 