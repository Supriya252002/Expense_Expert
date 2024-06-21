import { Component, OnInit } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SideNavComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  profileEntries: any[] = [];  

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      age: ['', [Validators.required, Validators.max(18)]],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadFormData();
  }

  get control() {
    return this.profileForm.controls;
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log("Profile Form Submitted", this.profileForm.value);
      this.saveFormData();
      this.openSnackbar("Form Submitted Successfully","Thank You");
      this.router.navigate(['/expense-tracker/dashboard']);
    } else {
      this.profileForm.markAllAsTouched();
      this.openSnackbar("Fill all mandatory Fields", "off");
    }
  }

  openSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  saveFormData() {
    const savedEntries = localStorage.getItem('profileEntries');
    const entriesArray = savedEntries ? JSON.parse(savedEntries) : [];
   
    entriesArray.push(this.profileForm.value);

    localStorage.setItem('profileEntries', JSON.stringify(entriesArray));
  }

  loadFormData() {
   
    const savedEntries = localStorage.getItem('profileEntries');
    this.profileEntries = savedEntries ? JSON.parse(savedEntries) : [];
  }

  onBack(){
    this.router.navigate(['/expense-tracker/dashboard'])
  }
}

