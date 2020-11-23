import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
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
import { AddPageComponent } from './add-page/add-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { SetweatherinfoComponent } from './setweatherinfo/setweatherinfo.component';
import { EditweatherComponent } from './/editweather/editweather.component';
import { MagicbuttonComponent } from './magicbutton/magicbutton.component';
import { TranslationsComponent } from './translations/translations.component';
import { SendnotificationComponent } from './sendnotification/sendnotification.component';
import { SearchhistoryComponent } from './searchhistory/searchhistory.component';
import { ForgotpasswordrequestComponent } from './forgotpasswordrequest/forgotpasswordrequest.component';
import { DatasynclogsComponent } from './datasynclogs/datasynclogs.component';
import { WhattodoComponent } from './whattodo/whattodo.component';
import { EdittranslationsComponent } from './edittranslations/edittranslations.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';

@NgModule({
  declarations: [PagesComponent, AddPageComponent, EditPageComponent, SetweatherinfoComponent,
  EditweatherComponent, MagicbuttonComponent, TranslationsComponent, 
  SendnotificationComponent, SearchhistoryComponent,
  ForgotpasswordrequestComponent, DatasynclogsComponent,
  WhattodoComponent, EdittranslationsComponent, ChangepasswordComponent],
  imports: [
    RouterModule.forChild([
			{
				path: '',
				component: PagesComponent
			},
			{
				path: 'add-page',
				component: AddPageComponent
			},
			{
				path: 'edit-page/:id',
				component: EditPageComponent
			},{
				path: 'setweatherinfo',
				component: SetweatherinfoComponent
			},{
				path: 'editweather',
				component: EditweatherComponent
			},{
				path: 'magicbutton',
				component: MagicbuttonComponent
			},{
				path: 'translations',
				component: TranslationsComponent
			},{
				path: 'sendnotification',
				component: SendnotificationComponent
			},{
				path: 'searchhistory',
				component: SearchhistoryComponent
			},{
				path: 'forgotpasswordrequest',
				component: ForgotpasswordrequestComponent
			}	,{
				path: 'datasynclogs',
				component: DatasynclogsComponent
			},{
				path: 'whattodo',
				component: WhattodoComponent
			},{
				path: 'edittranslations',
				component: EdittranslationsComponent
			}	,{
				path: 'changepassword',
				component: ChangepasswordComponent
			}
			
		]),
		CommonModule,	
		FormsModule,	ReactiveFormsModule,
        RichTextEditorAllModule,
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
		MatDialogModule
  ]
})
export class PagesModule { }
