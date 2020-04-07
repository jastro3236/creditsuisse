import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { isNullOrUndefined, isNumber } from 'util';

import { DatePipe } from '@angular/common';
import { EmailService } from 'src/app/services/email.service';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Request } from 'src/app/model/Request';
import { RequestsService } from 'src/app/services/requests.service';
import { Statuses } from 'src/app/model/Statuses';
import { User } from 'src/app/model/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private requestService: RequestsService,
		private userService: UsersService,
		private emailService: EmailService,
		private router: Router,
		private modalService: NgbModal,
		private datePipe: DatePipe,
		private cdr: ChangeDetectorRef
	) {

	}

	public isLoading = true;
	public request: Request;
	public isTextareaExpanded = false;
	public requestDeadlineString: string;
	public isFormDisabled: boolean;
	public requestorSearchResult: User[] = [];
	public isRequestorSearchListVisible: boolean;
	public isFormSubmitted: boolean = false;
	public requestorDisplayName: string;

	@ViewChild('modalContent') private datepickerContent;
	datepickerModal: any;
	selectedId: number = 0;
	wantedCharacters: string[] = [];


	ngOnInit() {
		this.populateCharacterArray();
		this.selectedId = parseInt(this.route.snapshot.paramMap.get('id'));

		if (isNullOrUndefined(this.selectedId) || isNaN(this.selectedId)) {
			this.request = new Request();
			this.requestDeadlineString = '';
			this.isLoading = false;
			this.isFormDisabled = false;
		}
		else {
			this.requestService.getbById(this.selectedId).subscribe((res) => {
				this.request = res[0];
				if (isNullOrUndefined(this.request)) {
					this.request = new Request();
				}
				this.request.Deadline = new Date(this.request.Deadline);
				this.requestDeadlineString = this.datePipe.transform(this.request.Deadline, 'dd-MMM-yy');
				if (this.request.Requestor == null) {
					this.isFormDisabled = false;
					this.isLoading = false;
					return;
				}
				this.userService.get(res[0].Requestor).subscribe((res: User) => {
					this.request.RequestorObject = res;
					this.requestorDisplayName = this.request.RequestorObject.DisplayName;
					let isOwner = this.request.RequestorObject.Roles.find(role => role == 'Owner') != undefined || this.request.Status == Statuses.Draft;
					this.isFormDisabled = !isOwner;
					this.isLoading = false;
				});
			});
		}
	}
	@HostListener('focusout', ['$event.target'])
	onFocusout() {
		this.hideUserList();
	}
	deadlineInputClick(event): void {
		event.srcElement.blur();
		event.preventDefault();
		this.openModal(this.datepickerContent);
	}

	onRequestorType(event: any): void {
		let searchParam = event.target.value.toString();
		this.userService.searchByAnyValue(searchParam).subscribe((res: User[]) => {
			this.requestorSearchResult = res.slice(0, 5);
			this.isRequestorSearchListVisible = true;
		});
	}
	async hideUserList() {
		await this.delay(250);
		this.isRequestorSearchListVisible = false;
		this.userService.getAll().subscribe((users: User[]) => {
			let u = users.find(user => user.DisplayName == this.requestorDisplayName);
			if (u == undefined) {
				this.request.Requestor = null;
				this.requestorDisplayName = null;
			}
		});
	}
	delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	selectRequestor(user: User): void {
		this.request.Requestor = user.id;
		this.request.RequestorObject = user;
		this.requestorDisplayName = user.DisplayName;
	}

	openModal(content): void {
		this.datepickerModal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}

	onDataChange(wantedCharacters: string[]) {
		this.request.WantedCharacters = wantedCharacters;
	}
	populateCharacterArray(): void {
		for (let i = 0; i < 100; i++) {
			this.wantedCharacters.push(this.generateRandomString(5));
		}
	}
	generateRandomString(length: number) {
		var result = '';
		var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charactersLength = characters.length;
		for (var i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	saveButtonClik(): void {
		this.request.Status = Statuses.Draft;
		if (this.selectedId > 0) {
			this.requestService.updateRequest(this.selectedId, this.request).subscribe(() => {
				this.router.navigate(['/dashboard']);
			});
			return;
		}
		this.requestService.addNewRequest(this.request).subscribe(() => {
			this.router.navigate(['/dashboard']);
		},
		() => {
			this.router.navigate(['/dashboard']);
		});

	}
	onSubmit(form: NgForm): void {
		this.isFormSubmitted = true;
		if (form.valid) {
			this.request.Status = Statuses.New;
			if (this.request.id == null) {
				this.requestService.addNewRequest(this.request).subscribe(() => {
					this.emailService.sendConfirmationEmail(this.request.RequestorObject);
					this.router.navigate(['/dashboard']);
				});
			}
			else {
				this.requestService.updateRequest(this.request.id, this.request).subscribe((res: Request) => {
					this.emailService.sendChangeEmail(res);
					this.router.navigate(['/dashboard']);
				});
			}
		}
	}
	onTextareaInput(e: any): void {
		let hasScroll = (e.target.scrollTop > 0);
		let hasClass = (e.target.className.indexOf('expanded') >= 0);

		if (hasScroll && !hasClass) {
			this.isTextareaExpanded = true;
		}

		if (e.target.value.length == 0) {
			this.isTextareaExpanded = false;
		}
	}
	onDatePickerClosed(pickedDate: Date): void {
		this.datepickerModal.close();
		if (isNullOrUndefined(pickedDate)) {
			return;
		}
		else {
			this.request.Deadline = pickedDate;
			this.requestDeadlineString = this.datePipe.transform(this.request.Deadline, 'dd-MMM-yy');
		}
	}

}
