import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenretypesComponent } from './genretypes/genretypes.component';
import { AddgenreComponent } from './addgenretype/addgenre.component';
import { EditgenreComponent } from './editgenretype/editgenre.component';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LightboxModule } from 'ngx-lightbox';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatVideoModule } from 'mat-video';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction'   // agm-direction
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { socket_config } from '../../../config';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config_socket: SocketIoConfig = { url: socket_config.SOCKET_URL, options: {} };


import {
	MatInputModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatSortModule,
	MatTableModule,
	MatSelectModule,
	MatMenuModule,
	MatProgressBarModule,
	MatButtonModule,
	MatCheckboxModule,
	MatDialogModule,
	MatTabsModule,
	MatNativeDateModule,
	MatCardModule,
	MatRadioModule,
	MatIconModule,
	MatDatepickerModule,
	MatExpansionModule,
	MatAutocompleteModule,
	MAT_DIALOG_DEFAULT_OPTIONS,
	MatSnackBarModule,
	MatTooltipModule
	
} from '@angular/material';

@NgModule({
  declarations: [ GenretypesComponent, AddgenreComponent, EditgenreComponent],
  imports: [
        //BrowserAnimationsModule,
        MatVideoModule,
        LightboxModule,
		CommonModule,
		NgbModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatMenuModule,
		MatSelectModule,
        MatInputModule,
		MatTableModule,
		MatAutocompleteModule,
		MatRadioModule,
		MatIconModule,
		MatNativeDateModule,
		MatProgressBarModule,
		MatDatepickerModule,
		MatCardModule,
		MatPaginatorModule,
		MatSortModule,
		MatCheckboxModule,
		MatProgressSpinnerModule,
		MatSnackBarModule,
		MatExpansionModule,
		MatTabsModule,
		MatTooltipModule,
		RichTextEditorAllModule,
		MatDialogModule,
	   RouterModule.forChild([
			{
				path: '',
				component: GenretypesComponent
			},{
				path: 'addgenretype',
				component: AddgenreComponent
			},{
				path: 'editgenretype/:id',
				component: EditgenreComponent
			}			
			
		]),
	   AgmCoreModule.forRoot({
          apiKey: 'AIzaSyCJNqXPHh_q1PSjqbMX7m3IZm4sTs0arDg',
          libraries: ['places']
        }),
	   MatGoogleMapsAutocompleteModule,
	   SocketIoModule.forRoot(config_socket)
  ]
})
export class GenreModule { }
