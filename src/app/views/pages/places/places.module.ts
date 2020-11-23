import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesComponent } from './places.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
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
import { PlacetypesComponent } from './placetypes/placetypes.component';
import { AddplaceComponent } from './addplace/addplace.component';
import { EditplaceComponent } from './editplace/editplace.component';
import { AddplacetypeComponent } from './addplacetype/addplacetype.component';
import { EditplacetypeComponent } from './editplacetype/editplacetype.component';
@NgModule({
  declarations: [PlacesComponent, PlacetypesComponent, AddplaceComponent, EditplaceComponent, AddplacetypeComponent, EditplacetypeComponent],
  imports: [
    CommonModule,
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
		NgbModule,
	   RouterModule.forChild([
			{
				path: '',
				component: PlacesComponent
			},
			{
				path: 'placetypes',
				component: PlacetypesComponent
			},{
				path: 'addplace',
				component: AddplaceComponent
			},{
				path: 'editplace',
				component: EditplaceComponent
			},{
				path: 'addplacetype',
				component: AddplacetypeComponent
			},{
				path: 'editplacetype',
				component: EditplacetypeComponent
			}
			
		])
  ]
})
export class PlacesModule { }
