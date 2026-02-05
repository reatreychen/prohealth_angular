import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private apiUrl = `${environment.apiUrl}/posts`;

    constructor(private http: HttpClient) { }

    createPost(data: FormData): Observable<any> {
        return this.http.post(`${this.apiUrl}/create`, data, { withCredentials: true });
    }

    getPosts(): Observable<any> {
        return this.http.get(`${this.apiUrl}/get-all`, { withCredentials: true });
    }

    getPost(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
    }

    updatePost(id: string, data: FormData): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${id}`, data, { withCredentials: true });
    }

    deletePost(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
    }
}
