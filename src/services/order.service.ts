import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private apiUrl = `${environment.apiUrl}/orders`;

    constructor(private http: HttpClient) { }

    createOrder(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/create`, data, { withCredentials: true });
    }

    getOrders(): Observable<any> {
        return this.http.get(`${this.apiUrl}/get-all`, { withCredentials: true });
    }

    getOrder(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
    }

    updateOrder(id: string, data: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${id}`, data, { withCredentials: true });
    }

    deleteOrder(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
    }
}
