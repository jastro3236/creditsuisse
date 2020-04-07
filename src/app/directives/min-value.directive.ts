import { AbstractControl, FormControl, NG_VALIDATORS, ValidatorFn } from '@angular/forms';
import { Directive, Input } from '@angular/core';

import { isNullOrUndefined } from 'util';

function validateMinValue(min: number): ValidatorFn {
	return (c: AbstractControl) => {
		let value: number = parseInt(c.value);
		let falseObj = {
			minValue: {
				valid: false
			}
		};
		if (isNullOrUndefined(value)) {
			return falseObj;
		}
		let isValid = value >= 250000;
		return isValid ? null : falseObj;
	};
}


@Directive({
	selector: '[csMinValue][ngModel]',
	providers: [
		{ provide: NG_VALIDATORS, useExisting: CsMinValueValidator, multi: true }
	]
})
export class CsMinValueValidator {
	@Input('csMinValue') csMinValue: number;
	validator: ValidatorFn;


	constructor() {
		this.validator = validateMinValue(this.csMinValue);
	}

	validate(c: FormControl) {
		return this.validator(c);
	}

}
