import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './components/form/form.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{ path: 'form/:id', component: FormComponent },
	{
		path: '',
		redirectTo: '/dashboard',
		pathMatch: 'full'
	},
	{ path: 'dashboard', component: MainPageComponent },
	{ path: 'form', component: FormComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
