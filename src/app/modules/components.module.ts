import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CsCalendarComponent } from '../components/cs-calendar/cs-calendar.component';
import { CsDropdownComponent } from '../components/cs-dropdown/cs-dropdown.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { FormComponent } from '../components/form/form.component';
import { FormFooterComponent } from '../components/form/form-footer/form-footer.component';
import { FormHeaderComponent } from '../components/form/form-header/form-header.component';
import { MainPageComponent } from '../components/main-page/main-page.component';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		CsCalendarComponent,
		CsDropdownComponent,
		DashboardComponent,
		FormFooterComponent,
		FormHeaderComponent,
		MainPageComponent,
		FormComponent,
	],
	exports: [
		CsCalendarComponent,
		CsDropdownComponent,
		DashboardComponent,
		FormFooterComponent,
		FormHeaderComponent,
		MainPageComponent,
		FormComponent,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
