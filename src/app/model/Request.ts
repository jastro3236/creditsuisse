import { User } from './User';

export class Request {
	constructor() {
		this.RequestName = '';
		this.Requestor = null;
		this.RequestorObject = new User();
		this.GoodEnding = 'Yes';
		this.Description = '';
		this.NeedStoryteller = null;
		this.Storyteller = null;
		this.WantedCharacters = [];
		this.Deadline = null;
		this.Budget = null;
		this.Status = '';
	}

	RequestName: string;
	Requestor: number;
	RequestorObject: User;
	GoodEnding: string;
	Description: string;
	NeedStoryteller: boolean;
	Storyteller: number;
	WantedCharacters: string[];
	Deadline: Date;
	Budget: number
	Status: string;
	id: number;
}