import { Component, OnInit } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { inject } from '@angular/core';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SideNavComponent, MatIconModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  todoTransaction = [
    { description: 'Pay Electricity Bills' },
    { description: 'Pay Monthly Report' },
    { description: 'Submit Transaction Report' }
  ];

  totalcurrentmonthincome = 0;
  totalcurrentmonthexpense = 0;

  lastmonthIncomeEntries: any;
  lastmonthExpenseEntries: any
  constructor(public router: Router, private Service: UserServiceService) {
    //Monthwise income 
    this.Service.currentIncome.subscribe(newMonthlyIncomes => {
      const currentMonth = new Date().toLocaleString('default', { month: 'long' });
      this.totalcurrentmonthincome = newMonthlyIncomes[currentMonth] || 0;

      this.lastmonthIncomeEntries = Object.entries(newMonthlyIncomes).map(([key, value]) => [key, `Rs.${value}`]).slice(0, 3);
    });
    //Total income value
    // this.Service.totalIncome$.subscribe((totalIncome) => {
    //   this.totalcurrentmonthincome = totalIncome;
    // });

    //Total expense value
    // this.Service.totalExpense$.subscribe((totalExpense) => {
    //   this.totalcurrentmonthexpense = totalExpense;
    // });

    //Month-wise expense
    this.Service.currentExpense.subscribe(newMonthlyExpenses => {
      const currentMonths = new Date().toLocaleString('default', { month: 'long' });
      this.totalcurrentmonthexpense = newMonthlyExpenses[currentMonths] || 0;

      this.lastmonthExpenseEntries = Object.entries(newMonthlyExpenses).map(([key, value]) => [key, `Rs.${value}`]).slice(0, 4);
    });
  }

  ngOnInit(): void {
    //Current Month Income
    this.Service.currentMonthIncome$.subscribe(currenMonthIncome => {
      this.totalcurrentmonthincome = currenMonthIncome;
    });
    //Current Month Expense
    this.Service.currentMonthExpense$.subscribe(currentMonthExpense => {
      this.totalcurrentmonthexpense = currentMonthExpense;
    });

  }

  onIncome() {
    this.router.navigate(['/expense-tracker/income']);
  }

  onExpense() {
    this.router.navigate(['/expense-tracker/expense']);
  }

  onTransaction() {
    this.router.navigate(['/expense-tracker/transaction']);
  }

  get totalcurrentmonthsavings(): number {
    return this.totalcurrentmonthincome - this.totalcurrentmonthexpense;
  }
}
