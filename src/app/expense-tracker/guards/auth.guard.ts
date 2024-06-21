// src/app/expense-tracker/Services/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  const localData = localStorage.getItem('isLoggedIn');

  // Protect other routes
  if (localData == 'true') {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};

