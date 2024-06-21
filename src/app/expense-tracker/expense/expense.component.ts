import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faSave, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../../Services/user-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})

export class ExpenseComponent implements OnInit {
  expenseForm: any;
  totalcurrentmonthexpense = 0;
  selectedMonth: string;
  showOtherInput: boolean = false;
  faEdit = faEdit;
  faSave = faSave;
  faTrash = faTrash;
  faTimes = faTimes;
  minDateTime: string = ''
  editingIndex: number | null = null;
  editingExpense: any = {};
  months: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  expenseTypes: string[] = ["Groceries", "Utilities", "Rent", "Other"];
  monthlyExpenses: { month: string, expenses: any[] }[] = [];
  monthSelected: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private expenseService: UserServiceService
  ) {
    this.selectedMonth = new Date().toLocaleString('default', { month: 'long' });
  }

  private setMinDateTime(): void {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    this.minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      month: ['', Validators.required],
      date: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required],
      otherExpense: [''],
    });

    this.setMinDateTime();
    this.months.forEach(month => {
      this.monthlyExpenses.push({ month: month, expenses: [] });
    });

    this.loadFromLocalStorage();
    this.updateTotalExpense();
    this.updatecurrentMonthExpense();
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    // this.getFilteredExpenses();
    this.updateTotalExpense();
  }

  getExpenseForMonth(month: string): any[] {
    const monthData = this.monthlyExpenses.find(m => m.month === month);
    return monthData ? monthData.expenses : [];
  }

  getFilteredExpenses() {
    return this.getExpenseForMonth(this.selectedMonth);
  }

  onSubmitExpense() {
    if (this.expenseForm.valid) {
      const newExpense = this.expenseForm.value;
      const monthData = this.getExpenseForMonth(this.selectedMonth);
      monthData.push(newExpense);
      this.saveToLocalStorage();
      this.expenseForm.reset();
      this.expenseForm.patchValue({ month: this.selectedMonth });
      this.updateTotalExpense();
      this.updateMonthlyExpense();
      this.updatecurrentMonthExpense();
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('monthlyExpenses', JSON.stringify(this.monthlyExpenses));
  }

  loadFromLocalStorage() {
    const retrievedData = JSON.parse(localStorage.getItem('monthlyExpenses') || '[]');
    if (retrievedData.length > 0) {
      this.monthlyExpenses = retrievedData;
    }
    this.updateMonthlyExpense();
    this.updateTotalExpense();
    this.updatecurrentMonthExpense();
  }

  calculateTotalExpense(month: string): number {
    const expenses = this.getExpenseForMonth(month);
    return expenses.reduce((acc, curr) => acc + parseFloat(curr.expenseAmount), 0);
  }


  updateMonthlyExpense() {
    const monthlyExpenseObj: { [key: string]: number } = {};
    this.monthlyExpenses.forEach(monthData => {
      monthlyExpenseObj[monthData.month] = this.calculateTotalExpense(monthData.month);
    });
    this.expenseService.updateExpense(monthlyExpenseObj);
  }

  updateTotalExpense() {
    const totalExpense = this.calculateTotalExpense(this.selectedMonth);
    this.totalcurrentmonthexpense = totalExpense;
    this.expenseService.updateTotalExpense(totalExpense);
  }

  updatecurrentMonthExpense() {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const currentMonthExpense = this.calculateTotalExpense(currentMonth);
    this.expenseService.updatecurrrentMonthExpense(currentMonthExpense);
  }
  onSave() {
    if (this.expenseForm.valid) {
      // this.expenseForm.reset({ month: this.selectedMonth });
      // this.getFilteredExpenses();
      console.log("Expense Added SUccesfully");
      this.updateTotalExpense();
    }
  }
  onBack() {
    this.router.navigate(['/expense-tracker/dashboard']);
  }
  editExpense(index: number) {
    const expenses = this.getFilteredExpenses();
    this.editingIndex = index;
    this.editingExpense = { ...expenses[index] };
  }

  saveExpense(index: number) {
    if (this.editingIndex !== null) {
      const expenses = this.getFilteredExpenses();
      expenses[index] = this.editingExpense;
      this.editingIndex = null;
      this.editingExpense = {};
      this.saveToLocalStorage();
      this.updateTotalExpense();
    }
  }

  deleteExpense(index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this Expense Entry?",
      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#008080',
      cancelButtonColor: 'rgb(247, 41, 41)',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const expenses = this.getFilteredExpenses();
        expenses.splice(index, 1);
        this.saveToLocalStorage();
        this.updateTotalExpense();
        this.updatecurrentMonthExpense();
        Swal.fire(
          'Deleted!',
          'The Expense Entry is deleted',
          'success'
        );
      }
    });
  }

  cancelEdit() {
    this.editingIndex = null;
    this.editingExpense = {};
  }
}


