import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = `${environment.apiUrl}/product`;

    constructor(private http: HttpClient) { }

    createProduct(data: FormData): Observable<any> {
        return this.http.post(`${this.apiUrl}/create`, data, { withCredentials: true });
    }

    getProducts(): Observable<any> {
        return this.http.get(`${this.apiUrl}/get-all`, { withCredentials: true });
    }

    getProduct(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
    }

    updateProduct(id: string, data: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${id}`, data, { withCredentials: true });
    }

    deleteProduct(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
    }
}
