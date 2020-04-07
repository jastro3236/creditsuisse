import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { isNullOrUndefined } from 'util';

export class Week {
	days: Day[]
}
export class Day {

	constructor(day: Date, isSelectedMonth: boolean, isSelected: boolean) {
		this.day = day;
		this.isSelectedMonth = isSelectedMonth;
		this.isSelected = isSelected;
	}
	day: Date;
	isSelectedMonth: boolean;
	isSelected: boolean;
}
export class Month {
	name: string;
	index: number;
	shortName: string;
}

@Component({
	selector: 'app-cs-calendar',
	templateUrl: './cs-calendar.component.html',
	styleUrls: ['./cs-calendar.component.scss']
})
export class CsCalendarComponent {

	constructor() { }

	@Output() close = new EventEmitter<Date>();
	minDate: Date;
	maxDate: Date;
	public month: Week[] = [];
	public namesOfDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
	public monthsPicker: Month[] = [];
	public selectedMonth: number;
	public selectedYear: number;
	public selectedDay: Day;

	ngAfterContentInit(): void {
		this.minDate = this.addDaysToDate(new Date(), 7);
		this.maxDate = new Date(this.minDate.getFullYear(), 11, 31, 0, 0, 0, 0);

		let today = new Date();
		let startingDate = this.addDaysToDate(today, 28);
		this.selectedMonth = startingDate.getMonth();
		this.selectedYear = startingDate.getFullYear();
		this.selectedDay = new Day(startingDate, true, true);
		this.generateMonth(startingDate);
		this.generateMonthList();
	}
	onMonthClick(value: number): void {
		let newValue = this.selectedMonth + value;
		if (newValue <= -1) {
			this.selectedMonth = 11;
			this.selectedYear -= 1;
		}
		else if (newValue >= 12) {
			this.selectedMonth = 0;
			this.selectedYear += 1;
		}
		else {
			this.selectedMonth = newValue;
		}
		this.month = [];
		this.generateMonth(new Date(this.selectedYear, this.selectedMonth));
	}
	onMmonthPickerClick(mIndex: number): void {
		this.selectedMonth = mIndex;
		this.month = [];
		this.generateMonth(new Date(this.selectedYear, this.selectedMonth));
	}
	onYearClick(value: number): void {
		this.selectedYear += value;
		this.month = [];
		this.generateMonth(new Date(this.selectedYear, this.selectedMonth));
	}
	onDayClick(clickedDay: Day) {
		this.selectedYear = clickedDay.day.getFullYear();
		this.month.forEach(week => {
			week.days.forEach(day => {
				day.isSelected = this.areDatesEqual(day.day, clickedDay.day);
			});
		});
		this.selectedDay = clickedDay;
		this.close.emit(this.selectedDay.day);
	}
	generateMonth(selectedMonthDate: Date) {
		let firstDayOfMonth = new Date(selectedMonthDate.getFullYear(), selectedMonthDate.getMonth(), 1);
		let firstDayOfGrid = this.addDaysToDate(firstDayOfMonth, -firstDayOfMonth.getDay());
		for (let weekIndex = 0; weekIndex < 6; weekIndex++) {
			let week = new Week();
			week.days = [];
			for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
				let newDate = this.addDaysToDate(firstDayOfGrid, (weekIndex * 7) + dayIndex);
				let newDay: Day;
				if (isNullOrUndefined(this.selectedDay)) {
					newDay = {
						day: newDate,
						isSelectedMonth: (this.selectedMonth == newDate.getMonth()),
						isSelected: false
					};
				}
				else {
					newDay = {
						day: newDate,
						isSelectedMonth: (this.selectedMonth == newDate.getMonth()),
						isSelected: this.areDatesEqual(newDate, this.selectedDay.day)
					};
				}

				week.days.push(newDay);
			}
			this.month.push(week);
		}
	}
	generateMonthList(): void {
		this.monthsPicker = [];
		let namesOfMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		for (let i = 0; i < namesOfMonths.length; i++) {
			this.monthsPicker.push(
				{
					name: namesOfMonths[i],
					index: i,
					shortName: namesOfMonths[i].substr(0, 3)
				}
			);
		}
	}
	areDatesEqual(date1: Date, date2: Date): boolean {
		date1.setHours(0, 0, 0, 0);
		date2.setHours(0, 0, 0, 0);

		return (date1.getTime() == date2.getTime());
	}
	addDaysToDate(date, days): Date {
		const copy = new Date(Number(date));
		copy.setDate(date.getDate() + days);
		return copy;
	}
	cacnleButtonClick(): void {
		this.close.emit(null);
	}
	iterator(length: number, start: number) {
		let array: number[] = [];
		for (let i = start; i < length + start; i++) {
			array.push(i);
		}
		return array;
	}
	isDayDisabled(day: Day): boolean {
		let date = day.day;
		date.setHours(0, 0, 0, 0);
		return ((date < this.minDate) || (date > this.maxDate));
	}
}

