import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface PricingPlan {
    id: string;
    name: string;
    subtitle: string;
    price: number;
    currency: string;
    duration: number;
    features: string[];
    createdAt: Date;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

@Injectable({
    providedIn: 'root'
})
export class PricingPlanService {
    private apiUrl = `${environment.apiUrl}/pricing-plans`;

    constructor(private http: HttpClient) { }

    getAllPricingPlans(): Observable<PricingPlan[]> {
        return this.http.get<ApiResponse<PricingPlan[]>>(this.apiUrl).pipe(
            map(response => response.data)
        );
    }

    getPricingPlanById(id: string): Observable<PricingPlan> {
        return this.http.get<ApiResponse<PricingPlan>>(`${this.apiUrl}/${id}`).pipe(
            map(response => response.data)
        );
    }
}
