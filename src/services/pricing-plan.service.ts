import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PricingPlanService {
    private apiUrl = `${environment.apiUrl}/pricing-plans`;

    constructor(private http: HttpClient) { }

    getPlans(): Observable<any> {
        return this.http.get(`${this.apiUrl}`, { withCredentials: true });
    }

    getPlan(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`, { withCredentials: true });
    }

    createPlan(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, data, { withCredentials: true });
    }

    updatePlan(id: string, data: any): Observable<any> {
        return this.http.patch(`${this.apiUrl}/${id}`, data, { withCredentials: true });
    }

    deletePlan(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { withCredentials: true });
    }
}
