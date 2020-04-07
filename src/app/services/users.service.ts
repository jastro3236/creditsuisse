import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UsersService {

	private apiUri = 'http://localhost:3000/Users';
	constructor(private http: HttpClient) { }

	public getAll(): Observable<Object> {
		return this.http.get(this.apiUri);
	}

	public searchByAnyValue(param: string): Observable<Object> {
		return this.http.get(`${this.apiUri}?q=${param}`);
	}

	public get(id: number): Observable<Object> {
		return this.http.get(`${this.apiUri}/${id}`);
	}

}
