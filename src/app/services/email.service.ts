import { Injectable } from '@angular/core';
import { Request } from '../model/Request';
import { User } from '../model/User';

@Injectable({
	providedIn: 'root'
})
export class EmailService {

	constructor() { }
	/**
   fake api email query (to: requestor, storyteller, subject: new request, body: 
     Hi, A new request has been created by (Requestor.DisplayName). Cheers, Story Team)
   */

	newRequestBody = 'Hi, A new request has been created by [REQUESTOR]. Cheers, Story Team';
	newRequestSubject = 'New request';

	changeRequestBody = 'Hi, A change has been made in request number [ID]. Cheers, Story Team';
	changeRequestSubject = 'Request changed';

	public sendConfirmationEmail(user: User) {
		let body = this.newRequestBody.replace('[REQUESTOR]', user.DisplayName);
		alert(this.newRequestSubject + '\n' + body);
	}
	public sendChangeEmail(request: Request) {
		let body = this.changeRequestBody.replace('[ID]', request.id.toString());
		alert(this.changeRequestSubject + '\n' + body);
	}
}
