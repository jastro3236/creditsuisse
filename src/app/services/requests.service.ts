import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../model/Request';
import { SortParams } from '../model/SortParams';

@Injectable({
	providedIn: 'root'
})
export class RequestsService {

	private apiUri = 'http://localhost:3000/Requests';
	constructor(private http: HttpClient) { }

	public getAll(sortParams: SortParams, filter: string): Observable<Object> {
		return this.http.get(`${this.apiUri}?q=${filter}&_sort=${sortParams.field}&_order=${sortParams.order}`);
	}
	public getSortedData(params: SortParams): Observable<Object> {
		return this.http.get(`${this.apiUri}?_sort=${params.field}&_order=${params.order}`);
	}
	public getByAnyValue(param: string): Observable<Object> {
		return this.http.get(`${this.apiUri}?q=${param}`);
	}
	public getbById(id: number): Observable<Object> {
		return this.http.get(`${this.apiUri}?id=${id}`);
	}
	public addNewRequest(request: Request): Observable<Object> {
		return this.http.post(this.apiUri, this.mapRequestToDao(request));
	}

	public updateRequest(id: number, request: Request): Observable<Object> {
		return this.http.put(`${this.apiUri}/${id}`, this.mapRequestToDao(request));
	}

	private mapRequestToDao(request: Request): Object {
		let requestDao = {
			RequestName: request.RequestName,
			Requestor: request.Requestor,
			GoodEnding: request.GoodEnding,
			Description: request.Description,
			NeedStoryteller: request.NeedStoryteller,
			Storyteller: request.Storyteller,
			WantedCharacters: request.WantedCharacters,
			Deadline: request.Deadline,
			Budget: request.Budget,
			Status: request.Status,
			id: request.id
		};
		return requestDao;
	}
}
