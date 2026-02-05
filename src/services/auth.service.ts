import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Use environment-based URL for production/development
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, data, { withCredentials: true });
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/auth/login`, data, { withCredentials: true });
  }

  logout() {
    // Call backend logout to clear httpOnly cookies
    this.http.post(`${this.baseUrl}/auth/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.dispatchEvent(new CustomEvent('auth:changed', { detail: { action: 'logout' } }));
      },
      error: (err) => {
        console.warn('Logout request failed, clearing local state anyway', err);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.dispatchEvent(new CustomEvent('auth:changed', { detail: { action: 'logout' } }));
      }
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Optional: fetch current user from backend (if you provide /auth/me)
  fetchCurrentUser() {
    return this.http.get(`${this.baseUrl}/auth/me`, { withCredentials: true });
  }
}
