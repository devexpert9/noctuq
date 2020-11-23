import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VenuesComponent } from './venues.component';

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
import { AddvenueComponent } from './addvenue/addvenue.component';
import { EditvenueComponent } from './editvenue/editvenue.component';
import { FileUploadModule } from "ng2-file-upload";



@NgModule({
  declarations: [VenuesComponent, AddvenueComponent, EditvenueComponent],
  imports: [
    CommonModule,
    MatVideoModule,
        LightboxModule,
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
		FileUploadModule,
		AgmCoreModule.forRoot({
		  apiKey: 'AIzaSyDAlKLurAKhiplitl71hkm5m8mDQPPK4xs',
          libraries: ['places']
        }),
	   MatGoogleMapsAutocompleteModule,
    RouterModule.forChild([
		{
			path: '',
			component: VenuesComponent
		},
		{
			path: 'editvenue/:id',
			component: EditvenueComponent
		},
		{
			path: 'addvenue',
			component: AddvenueComponent
		}	
	])
  ]
})
export class VenuesModule { }
