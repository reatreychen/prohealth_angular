import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DoctorService {
    private apiUrl = `${environment.apiUrl}/doctors`;

    constructor(private http: HttpClient) { }

    getDoctors(): Observable<any> {
        return this.http.get(`${this.apiUrl}/get-all`, { withCredentials: true });
    }

    getDoctor(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
    }

    createDoctor(data: FormData): Observable<any> {
        return this.http.post(`${this.apiUrl}/create`, data, { withCredentials: true });
    }

    updateDoctor(id: string, data: FormData): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${id}`, data, { withCredentials: true });
    }

    deleteDoctor(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
    }
}
