import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../Services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registrationForm: FormGroup;
  activeForm: 'login' | 'register' = 'login';
  isVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      contactno: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/expense-tracker/dashboard']);
    }
  }

  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  }

  toggleVisible() {
    this.isVisible = !this.isVisible;
  }
  get control() {
    return this.loginForm.controls;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.onLogin(this.loginForm.value).subscribe({
        next: (response: any) => {
          if (response.success) {
            this.router.navigate(['/expense-tracker/dashboard']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Invalid credentials!',
              confirmButtonText: 'Close'
            });
          }
        },
        error: (err: any) => {
          console.error('Login error:', err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Login failed!',
            confirmButtonText: 'Close'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid form data!',
        confirmButtonText: 'Close'
      });
    }
  }

  onRegister() {
    if (this.registrationForm.valid) {
      this.authService.onSignUp(this.registrationForm.value).subscribe({
        next: (data: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Registration successful!',
            confirmButtonText: 'Close'
          });
          this.toggleForm('login');
        },
        error: (err: any) => {
          console.error('Registration error:', err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Registration failed!',
            confirmButtonText: 'Close'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid form data!',
        confirmButtonText: 'Close'
      });
    }
  }
}
