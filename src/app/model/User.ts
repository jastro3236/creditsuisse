export class User {
	constructor() {
		this.DisplayName = '';
		this.Name = '';
		this.Surname = '';
		this.Department = '';
		this.id = null;
		this.Manager = false;
		this.Roles = [];
	}
	DisplayName: string;
	Name: string;
	Surname: string;
	Department: string
	Email: string;
	id: number;
	Manager: boolean;
	Roles: string[];
}