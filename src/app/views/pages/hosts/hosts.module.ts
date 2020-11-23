import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostsComponent } from './hosts.component';
import { RouterModule, Routes } from '@angular/router';
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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EdithostComponent } from './edithost/edithost.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddhostComponent } from './addhost/addhost.component';
@NgModule({
  declarations: [HostsComponent, EdithostComponent, AddhostComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
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
    RouterModule.forChild([
		{
			path: '',
			component: HostsComponent
		},	
		{
			path: 'addhost',
			component: AddhostComponent
		},
		{
			path: 'edithost/:id',
			component: EdithostComponent
		}
	]),
  ]
})
export class HostsModule { }
