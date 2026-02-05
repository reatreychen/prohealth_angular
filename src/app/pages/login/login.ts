import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  showPassword = false;
  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    // Reset error message
    this.errorMessage = '';

    // Validate form
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all fields',
        confirmButtonColor: '#307bc3',
      });
      return;
    }

    this.isLoading = true;

    const loginData = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(loginData).subscribe({
      next: (response: any) => {
        this.isLoading = false;

        localStorage.setItem('access_token', response.accessToken);
        localStorage.setItem('refresh_token', response.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data));

        // Notify other parts of the app
        try {
          window.dispatchEvent(new CustomEvent('auth:changed', { detail: { action: 'login' } }));
        } catch (e) {
          console.warn('Could not dispatch auth event', e);
        }

        // Show success notification
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: `Welcome back, ${response.data.name}!`,
          confirmButtonColor: '#307bc3',
          timer: 2000,
          timerProgressBar: true,
        });

        // Redirect based on user role
        setTimeout(() => {
          if (response.data.role === 'ADMIN') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/']);
          }
        }, 300);
      },
      error: (error: any) => {
        this.isLoading = false;
        console.error('Login failed:', error);
        // Get error message from backend response
        const errorMsg =
          error.error?.message || error.message || 'Login failed. Please try again.';
        this.errorMessage = errorMsg;

        // Show error notification
        Swal.fire({
          icon: 'error',
          title: 'Login Failed!',
          text: errorMsg,
          confirmButtonColor: '#307bc3',
        });
      },
    });
  }

  clearForm() {
    this.email = '';
    this.password = '';
  }
}
