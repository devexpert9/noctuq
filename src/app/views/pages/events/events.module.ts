import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { EventtypesComponent } from './eventtypes/eventtypes.component';

import { CommentsComponent } from './comments/comments.component';
import { EditcommentsComponent } from './editcomment/editcomments.component';

import { VieweventfeedComponent } from './vieweventfeed/vieweventfeed.component';

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
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

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

import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../core/format-datepicker';
import { EditeventComponent } from './editevent/editevent.component';
import { AddeventComponent } from './addevent/addevent.component';
import { AddeventtypeComponent } from './addeventtype/addeventtype.component';
import { EditeventtypeComponent } from './editeventtype/editeventtype.component';
import { EventsliderimagesComponent } from './eventsliderimages/eventsliderimages.component';
import { AddslideComponent } from './addslide/addslide.component';
import { EditslideComponent } from './editslide/editslide.component';


@NgModule({
  declarations: [VieweventfeedComponent, CommentsComponent, EditcommentsComponent, EventsComponent, EventtypesComponent, EditeventComponent, AddeventComponent, AddeventtypeComponent, EditeventtypeComponent, EventsliderimagesComponent, AddslideComponent, EditslideComponent],
  imports: [
	    DatePickerModule,
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
		NgxMaterialTimepickerModule,
	   RouterModule.forChild([
			{
				path: '',
				component: EventsComponent
			},
			{
				path: 'editevent/:id',
				component: EditeventComponent
			},
			{
				path: 'addevent',
				component: AddeventComponent
			},{
				path: 'addeventtype',
				component: AddeventtypeComponent
			},
			{
				path: 'editeventtype',
				component: EditeventtypeComponent
			},
			{
				path: 'eventsliderimages',
				component: EventsliderimagesComponent
			},{
				path: 'addslide',
				component: AddslideComponent
			},
			{
				path: 'editslide',
				component: EditslideComponent
			},{
				path: 'comments/:id',
				component: CommentsComponent
			},{
				path: 'editcomment/:id/:ids',
				component: EditcommentsComponent
			},{
				path: 'vieweventfeeds/:id',
				component: VieweventfeedComponent
			}
			
			
		]),
	   AgmCoreModule.forRoot({
          apiKey: 'AIzaSyCJNqXPHh_q1PSjqbMX7m3IZm4sTs0arDg',
          libraries: ['places']
        }),
	   MatGoogleMapsAutocompleteModule,
	   SocketIoModule.forRoot(config_socket)
  ],
  
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class EventsModule { }
