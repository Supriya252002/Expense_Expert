import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtraOptions } from '@angular/router';

//Implement Lazy Loading
export const routes: Routes = [
    // { path: '', redirectTo: 'login', pathM   atch: 'full' },
    { path: 'expense-tracker', loadChildren: () => import('./expense-tracker/expense-tracker.module').then(m => m.ExpenseTrackerModule), }
];
