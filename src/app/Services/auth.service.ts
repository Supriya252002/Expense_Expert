import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  onLogin(user: any): Observable<any> {
    return of(user).pipe(
      delay(1000),
      map((credentials) => {
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const foundUser = registeredUsers.find(
          (u: any) => u.email === credentials.email && u.password === credentials.password
        );
        if (foundUser) {
          localStorage.setItem('isLoggedIn', 'true');
          return { success: true };
        } else {
          localStorage.setItem('isLoggedIn', 'false');
          return { success: false };
        }
      })
    );
  }

  onSignUp(user: any): Observable<any> {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    registeredUsers.push(user);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    return of({ success: true }).pipe(delay(1000));
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'false';
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
  }
}
