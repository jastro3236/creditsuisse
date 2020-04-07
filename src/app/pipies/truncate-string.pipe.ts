import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
	transform(value: string, truncateTo: number): string {
		if (value == undefined) {
			return value;
		}
		return value.toString().slice(0, truncateTo);
	}
}