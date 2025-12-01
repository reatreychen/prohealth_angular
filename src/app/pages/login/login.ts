import { Component} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  showPassword = false;
  username = '';
  password = '';
  userType: 'Admin' | 'User' = 'User';

  rememberMe = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    console.log({
      username: this.username,
      password: this.password,
      userType: this.userType,
      rememberMe: this.rememberMe
    });
  }
}
