// shared.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {
  private monthlyTransactions: { month: string, transactions: any[] }[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  getTransactions(): { month: string, transactions: any[] }[] {
    return this.monthlyTransactions;
  }

  addTransaction(month: string, transaction: any) {
    const monthData = this.monthlyTransactions.find(m => m.month === month);
    if (monthData) {
      monthData.transactions.push(transaction);
    } else {
      this.monthlyTransactions.push({ month, transactions: [transaction] });
    }
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('monthlyTransactions', JSON.stringify(this.monthlyTransactions));
  }

  loadFromLocalStorage() {
    const retrievedData = JSON.parse(localStorage.getItem('monthlyTransactions') || '[]');
    if (retrievedData.length > 0) {
      this.monthlyTransactions = retrievedData;
    }
  }
}
