import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Check if user is authenticated
    const token = localStorage.getItem('access_token');
    const userJson = localStorage.getItem('user');

    if (!token || !userJson) {
      // User is not authenticated, redirect to login
      this.router.navigate(['/login']);
      return false;
    }

    try {
      const user = JSON.parse(userJson);

      // Check if user is ADMIN
      if (user.role === 'ADMIN') {
        return true;
      } else {
        // User is not admin, show error and redirect to home
        Swal.fire({
          icon: 'error',
          title: 'Access Denied',
          text: 'You do not have permission to access this page. Only admins can access the dashboard.',
          confirmButtonColor: '#307bc3',
        });
        this.router.navigate(['/']);
        return false;
      }
    } catch (e) {
      // Error parsing user data, redirect to login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
