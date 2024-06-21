import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private totalExpenseSubject = new BehaviorSubject<number>(0);
  private totalIncomeSubject = new BehaviorSubject<number>(0);
  private incomeSubject = new BehaviorSubject<{ [key: string]: number }>({});
  private expenseSubject = new BehaviorSubject<{ [key: string]: number }>({});
  private currentMonthIncome = new BehaviorSubject<number>(0);
  private currentMonthExpense = new BehaviorSubject<number>(0);

  currentMonthIncome$ = this.currentMonthIncome.asObservable();
  currentMonthExpense$=this.currentMonthExpense.asObservable();
  currentIncome = this.incomeSubject.asObservable();
  currentExpense = this.expenseSubject.asObservable();
  totalExpense$ = this.totalExpenseSubject.asObservable();
  totalIncome$ = this.totalIncomeSubject.asObservable();

  updateTotalExpense(newTotal: number) {
    this.totalExpenseSubject.next(newTotal);
  }

  updateTotalIncome(newTotal: number) {
    this.totalIncomeSubject.next(newTotal);
  }
  updateIncome(newIncome: { [key: string]: number }) {
    this.incomeSubject.next(newIncome);
  }

  updateExpense(newExpense: { [key: string]: number }) {
    this.expenseSubject.next(newExpense);
  }

  updatecurrentMonthIncome(amount: number) {
    this.currentMonthIncome.next(amount)
  }

  updatecurrrentMonthExpense(amount:number){
    this.currentMonthExpense.next(amount);
  }

 
  // getCurrentIncome(): { [key: string]: number } {
  //   return this.incomeSubject.value;
  // }

  // getCurrentExpense(): { [key: string]: number } {
  //   return this.expenseSubject.value;
  // }
}
