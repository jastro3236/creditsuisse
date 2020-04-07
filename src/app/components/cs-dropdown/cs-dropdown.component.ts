import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
export class ListElement {
	value: string;
	key: number;
	isSelected: boolean;
}

@Component({
	selector: 'app-cs-dropdown',
	templateUrl: './cs-dropdown.component.html',
	styleUrls: ['./cs-dropdown.component.scss']
})
export class CsDropdownComponent implements OnInit {
	isExpanded: boolean;

	@Input() data: string[] = [];
	@Input() selectedItems: string[];
	@Input() disabled: boolean;
	@Input() singlePick: boolean = false;
	@Output() onDataChange = new EventEmitter<string[]>();
	public dropdownData: ListElement[] = [];

	@ViewChild('dropdownList') list: ElementRef;

	constructor(private parentRef: ElementRef) { }

	ngOnInit(): void {
		this.populateDropdownLsit();
	}
	populateDropdownLsit(): void {
		for (let i = 0; i < this.selectedItems.length; i++) {
			this.dropdownData.push({ value: this.selectedItems[i], key: i, isSelected: true });

		}
		for (let i = this.selectedItems.length; i < this.data.length + this.selectedItems.length; i++) {
			this.dropdownData.push({ value: this.data[i], key: i, isSelected: false });
		}
	}
	onDropdownExpand(): void {
		this.isExpanded = true;
	}
	public onDropdownMinimize(): void {
		this.isExpanded = false;
	}
	onItemSelect(index: number): void {
		if (this.singlePick) {
			this.dropdownData.forEach(item => {
				item.isSelected = false;
			});
		}
		let item = this.dropdownData.find(i => i.key == index);
		item.isSelected = !item.isSelected;
		this.emitSelectedItems();
	}
	emitSelectedItems(): void {
		let selectedItems: string[] = [];
		this.dropdownData.forEach(item => {
			if (item.isSelected) {
				selectedItems.push(item.value);
			}
		});
		this.onDataChange.emit(selectedItems);
	}
	isSelected(index: number): boolean {
		return this.dropdownData.find(i => i.key == index && i.isSelected) == undefined;
	}
	getContent(): string {
		let content = '';
		this.dropdownData.forEach(item => {
			if (item.isSelected) {
				content += item.value + ';';
			}
		});
		return content;
	}
}
