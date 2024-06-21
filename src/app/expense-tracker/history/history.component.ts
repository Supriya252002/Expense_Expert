import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { SharedserviceService } from '../../Services/sharedservice.service';
@Component({
  selector: 'app-history',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  historyForm: any;
  selectedMonth: string;
  months: any[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octomber", "November", "December"]
  expenses: { month: string, expenseAmount: number }[] = [
    { month: 'January', expenseAmount: 1500 },
    { month: 'February', expenseAmount: 2000 },
    { month: 'March', expenseAmount: 1800 }
  ];
  monthSelected: boolean = false;
  januaryExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 1000 },
    { expenseType: 'Light Bills', expenseAmount: 1500 },
  ];
  februaryExpense: any[] = [
    { expenseType: 'Essentials', expenseAmount: 200 },
    { expenseType: 'Light Bills', expenseAmount: 400 }
  ];
  marchExpense: any[] = [
    { expenseType: 'Recharge', expenseAmount: 1100 },
    { expenseType: 'Essentials', expenseAmount: 250 }
  ];
  constructor(private fb: FormBuilder, private router: Router, private sharedService: SharedserviceService) {
    this.selectedMonth = new Date().toLocaleString('default', { month: 'long' });
  }

  ngOnInit(): void {
    this.historyForm = this.fb.group({
      month: ['', Validators.required],
      date: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required]
    });
  }

  // onSubmitExpense() {
  //   if (this.historyForm.valid) {
  //     const newExpense = this.historyForm.value;
  //     this.getFilteredExpenses().push(newExpense);
  //     this.historyForm.reset();
  //   }
  // }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;

  }

  getFilteredExpenses() {
    return this.sharedService.getTransactions().find(m => m.month === this.selectedMonth)?.transactions || [];
  }



  calculateTotalExpense(month: string): number {
    return this.sharedService.getTransactions().find(m => m.month === month)?.transactions.reduce((acc, curr) => acc + parseFloat(curr.expenseAmount), 0) || 0;
  }

  onSave() {
    if (this.historyForm.valid) {
      this.historyForm.reset({ month: this.selectedMonth });
    }
  }

  saveForm() {
    console.log("Form saved!");
  }

  onBack() {
    this.router.navigate(['/expense-tracker/dashboard']);
  }
}