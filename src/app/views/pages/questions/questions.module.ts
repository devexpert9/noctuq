import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions.component';
import { GuidecategoriesComponent } from './guidecategories/guidecategories.component';
import { AddguidecategoriesComponent } from './addguidecategories/addguidecategories.component';
import { EditguidecategoriesComponent } from './editguidecategories/editguidecategories.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { AddquestionsComponent } from './addquestions/addquestions.component';
import { EditquestionsComponent } from './editquestions/editquestions.component';

@NgModule({
  declarations: [QuestionsComponent, GuidecategoriesComponent, AddguidecategoriesComponent, EditguidecategoriesComponent, AddquestionsComponent, EditquestionsComponent],
  imports: [
        CommonModule,NgbModule,
	    FormsModule,
        NgbModule,
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
		MatDialogModule,
	    RouterModule.forChild([
			{
				path: '',
				component: QuestionsComponent
			},
			{
				path: 'addquestions',
				component: AddquestionsComponent
			},
			{
				path: 'editquestions',
				component: EditquestionsComponent
			},
			{
				path: 'guidecategories',
				component: GuidecategoriesComponent
			},
			{
				path: 'addguidecategories',
				component: AddguidecategoriesComponent
			},
			{
				path: 'editguidecategories',
				component: EditguidecategoriesComponent
			}
			
		])
  ]
})
export class QuestionsModule { }
