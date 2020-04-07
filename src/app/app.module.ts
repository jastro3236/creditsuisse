import { FormBuilder, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CsCalendarComponent } from './components/cs-calendar/cs-calendar.component';
import { CsDropdownComponent } from './components/cs-dropdown/cs-dropdown.component';
import { CsMinValueValidator } from './directives/min-value.directive';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormComponent } from './components/form/form.component';
import { FormFooterComponent } from './components/form/form-footer/form-footer.component';
import { FormHeaderComponent } from './components/form/form-header/form-header.component';
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { TruncatePipe } from './pipies/truncate-string.pipe';

@NgModule({
	declarations: [
		AppComponent,
		MainPageComponent,
		FormComponent,
		DashboardComponent,
		FormFooterComponent,
		FormHeaderComponent,
		TruncatePipe,
		CsCalendarComponent,
		CsDropdownComponent,
		CsMinValueValidator,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatTableModule,
		MatPaginatorModule,
		FormsModule,
		MatProgressSpinnerModule,
		MatDatepickerModule,
		MatNativeDateModule,
		FontAwesomeModule,
		MatTooltipModule,

	],
	providers: [MatDatepickerModule, DatePipe, FormBuilder],
	bootstrap: [AppComponent]
})
export class AppModule { }
