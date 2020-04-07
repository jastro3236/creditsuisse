import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatTableModule,
		MatTooltipModule,
	],
	exports: [
		CommonModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatTableModule,
		MatTooltipModule,
	],
})
export class MaterialModule { }
