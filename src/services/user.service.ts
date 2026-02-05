import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) { }

    getUsers(): Observable<any> {
        return this.http.get(`${this.apiUrl}`, { withCredentials: true });
    }

    getUser(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
    }

    createUser(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, data, { withCredentials: true });
    }

    updateUser(id: string, data: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${id}`, data, { withCredentials: true });
    }

    deleteUser(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
    }
}
