import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Authentication } from '../services/authentication';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: false,
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  public formError = '';

  credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: Authentication
  ) {}

  public onLoginSubmit(): void {
    this.formError = '';

    if (
      !this.credentials.name ||
      !this.credentials.email ||
      !this.credentials.password
    ) {
      this.formError = 'All fields are required, please try again';
      return;
    }

    const user = {
      name: this.credentials.name,
      email: this.credentials.email
    } as User;

    this.authenticationService
      .login(user, this.credentials.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.formError = 'Login failed. Check your email and password.';
        }
      });
  }
}