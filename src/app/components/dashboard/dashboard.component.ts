import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { MatTableDataSource } from '@angular/material/table';
import { RequestsService } from 'src/app/services/requests.service';
import { SortParams } from 'src/app/model/SortParams';
import { SortType } from 'src/app/model/SortType';
import { User } from 'src/app/model/User';
import { UsersService } from 'src/app/services/users.service';
import { isNullOrUndefined } from 'util';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	public dataSource: MatTableDataSource<Request>;
	public requests: Request[];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	public pageEvent: PageEvent;
	private filterParams: string = '';
	private sortParams: SortParams = new SortParams();
	users: User[] = [];

	constructor(
		private requestService: RequestsService,
		private userService: UsersService,
		private modalService: NgbModal
	) { }
	displayedColumns: string[] = [
		'id'
		, 'request-name'
		, 'requestor'
		, 'good-ending'
		, 'description'
		, 'need-storyteller'
		, 'storyteller'
		, 'wanted-characters'
		, 'deadline'
		, 'budget'
		, 'status'
		, 'controls'
	];
	sortTypes: string[] = [];

	filterSortModal: NgbModalRef;
	ngOnInit() {
		this.reloadDashboard();
		this.generateFilterTypes();
	}
	onDataChange(event: string[]) {
		let sortType: SortType;
		let keys = Object.keys(SortType);
		keys.forEach(key => {
			if (SortType[key] == event[0]) {
				sortType = SortType[key];
			}
		});
		this.sortParams = new SortParams(sortType);
	}
	generateFilterTypes(): void {
		let keys = Object.keys(SortType);
		let sortTypes = [];
		keys.forEach(key => {
			sortTypes.push(SortType[key]);
		});
		this.sortTypes = sortTypes;
	}
	reloadDashboard(): void {
		this.requests = [];
		this.dataSource = new MatTableDataSource<Request>(this.requests);
		this.requestService.getAll(this.sortParams, this.filterParams).subscribe((res: Request[]) => {
			this.requests = res;
			this.userService;
			this.dataSource = new MatTableDataSource<Request>(this.requests);
			this.dataSource.paginator = this.paginator;
		});
		this.userService.getAll().subscribe((users: User[]) => {
			this.users = users;
		});

	}
	openModal(content): void {
		this.filterSortModal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
		this.filterSortModal.result.then(() => {
			this.reloadDashboard();
		}, () => {
			this.reloadDashboard();
		});
	}
	get pageCount(): number {
		return this.paginator.getNumberOfPages();
	}
	paginatorInputChange(o: any): void {
		let val = o.target.value;
		let valNum = parseInt(val);
		if (isNaN(valNum) || isNullOrUndefined(valNum)) {
			return;
		}
		if (valNum <= 0) {
			this.paginator.pageIndex = 0;
		}
		if (valNum > 0) {
			if (valNum >= this.pageCount) {
				this.paginator.pageIndex = this.pageCount - 1;
			}
			else {
				this.paginator.pageIndex = valNum - 1;
			}
		}
		this.dataSource.paginator.page.emit({
			length: this.paginator.getNumberOfPages(),
			pageIndex: this.paginator.pageIndex,
			pageSize: this.paginator.pageSize
		});
	}
	getRoutePath(id: number) {
		return '/form/' + id;
	}
	hideTooltip(value: any): boolean {
		if (value == null || value == undefined) {
			return true;
		}
		return value.toString().length <= 50;
	}
	tooltipContent(value: any): string {
		if (value == null || value == undefined) {
			return '';
		}
		return value.toString().substr(0, 500);
	}
	nextPage(): void {
		if (this.paginator.pageIndex + 1 == this.paginator.getNumberOfPages()) {
			return;
		}

		this.paginator.pageIndex += 1;
		this.dataSource.paginator.page.emit({
			length: this.paginator.getNumberOfPages(),
			pageIndex: this.paginator.pageIndex,
			pageSize: this.paginator.pageSize
		});
	}
	previousPage(): void {
		if (this.paginator.pageIndex == 0) {
			return;
		}
		this.paginator.pageIndex -= 1;
		this.dataSource.paginator.page.emit({
			length: this.paginator.getNumberOfPages(),
			pageIndex: this.paginator.pageIndex,
			pageSize: this.paginator.pageSize
		});
	}
	getUserDisplayName(id: number): string {
		let user = this.users.find(u => u.id == id);
		if (id == null) {
			return '';
		}
		return (isNullOrUndefined(user)) ? id.toString() : user.DisplayName;
	}
}
