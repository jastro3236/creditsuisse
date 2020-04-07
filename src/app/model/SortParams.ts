import { SortType } from './SortType';

export class SortParams {
	public order: string = '';
	public field: string = '';

	readonly asc = 'asc';
	readonly desc = 'desc';

	constructor(sortType?: SortType) {
		switch (sortType) {
		case SortType.IdAsc:
			this.order = this.asc;
			this.field = 'id';
			break;
		case SortType.IdDesc:
			this.order = this.desc;
			this.field = 'id';
			break;
		case SortType.BudgetAsc:
			this.order = this.asc;
			this.field = 'Budget';
			break;
		case SortType.BudgetDesc:
			this.order = this.desc;
			this.field = 'Budget';
			break;
		case SortType.DeadlineAsc:
			this.order = this.asc;
			this.field = 'Deadline';
			break;
		case SortType.DeadlineDesc:
			this.order = this.desc;
			this.field = 'Deadline';
			break;
		case SortType.RequestNameAsc:
			this.order = this.asc;
			this.field = 'RequestName';
			break;
		case SortType.RequestNameDesc:
			this.order = this.desc;
			this.field = 'RequestName';
			break;
		case SortType.StatusAsc:
			this.order = this.asc;
			this.field = 'Status';
			break;
		case SortType.StatusDesc:
			this.order = this.desc;
			this.field = 'Status';
			break;
		}
	}
}