import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private apiUrl = `${environment.apiUrl}/carts`;
    private cartItemsSubject = new BehaviorSubject<any[]>([]);
    cartItems$ = this.cartItemsSubject.asObservable();

    constructor(private http: HttpClient) {
        this.loadCartFromLocalStorage();
    }

    private loadCartFromLocalStorage() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.cartItemsSubject.next(JSON.parse(savedCart));
        }
    }

    private saveToLocalStorage(items: any[]) {
        localStorage.setItem('cart', JSON.stringify(items));
    }

    addToCart(product: any, quantity: number = 1): void {
        const currentItems = this.cartItemsSubject.value;
        const existingItem = currentItems.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            currentItems.push({ ...product, quantity });
        }

        this.cartItemsSubject.next([...currentItems]);
        this.saveToLocalStorage(currentItems);

        // Optionally sync with API if logged in
        // this.syncWithApi(currentItems).subscribe();
    }

    removeFromCart(productId: string): void {
        const currentItems = this.cartItemsSubject.value.filter(item => item.id !== productId);
        this.cartItemsSubject.next(currentItems);
        this.saveToLocalStorage(currentItems);
    }

    updateQuantity(productId: string, quantity: number): void {
        const currentItems = this.cartItemsSubject.value;
        const item = currentItems.find(i => i.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.cartItemsSubject.next([...currentItems]);
                this.saveToLocalStorage(currentItems);
            }
        }
    }

    clearCart(): void {
        this.cartItemsSubject.next([]);
        localStorage.removeItem('cart');
    }

    getCartTotal(): number {
        return this.cartItemsSubject.value.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getCartCount(): number {
        return this.cartItemsSubject.value.reduce((count, item) => count + item.quantity, 0);
    }

    // API Sync Methods
    syncWithApi(items: any[]): Observable<any> {
        return this.http.post(`${this.apiUrl}`, { items }, { withCredentials: true });
    }

    getCartFromApi(): Observable<any> {
        return this.http.get(`${this.apiUrl}`, { withCredentials: true }).pipe(
            tap((res: any) => {
                if (res && res.items) {
                    this.cartItemsSubject.next(res.items);
                    this.saveToLocalStorage(res.items);
                }
            })
        );
    }
}
