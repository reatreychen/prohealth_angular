import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  form = {
    name: '',
    email: '',
    password: '',
    mobile: '',
    address_detail: '',
  };

  // inject auth service and router
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.form).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'Your account has been created. Redirecting to login page...',
          confirmButtonColor: '#307bc3',
          timer: 2000,
          timerProgressBar: true,
        });
        this.clearForm();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error: any) => {
        const errorMsg = error.error?.message || 'Registration failed. Please try again.';
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed!',
          text: errorMsg,
          confirmButtonColor: '#307bc3',
        });
      }
    });
  }

  clearForm() {
    this.form = {
      name: '',
      email: '',
      password: '',
      mobile: '',
      address_detail: '',
    };
  }
}
