import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTimes, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { SharedserviceService } from '../../Services/sharedservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})

export class TransactionComponent implements OnInit {
  todoForm: any;
  selectedMonth: string;
  months: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  faEdit = faEdit;
  faSave = faSave;
  faTrash = faTrash;
  faTimes = faTimes;
  minDateTime: string = '';
  editingIndex: number | null = null;
  editingTransaction: any = {};
  monthSelected: boolean = false;

  monthlyTransactions: { month: string, transactions: any[] }[] = [];

  constructor(private fb: FormBuilder, private router: Router, private sharedService: SharedserviceService) {
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
    this.selectedMonth = currentMonth;
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      month: ['', Validators.required],
      date: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required]
    });
    this.setMinDateTime();
    this.months.forEach(month => {
      this.monthlyTransactions.push({ month: month, transactions: [] });
    });

    this.loadFromLocalStorage();

    // this.todoForm.patchValue({ month: this.selectedMonth });
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
  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    // this.getFilteredTransactions();
  }

  getFilteredTransactions() {
    return this.sharedService.getTransactions().find(m => m.month === this.selectedMonth)?.transactions || [];
  }

  onSubmitExpense() {
    if (this.todoForm.valid) {
      const newExpense = this.todoForm.value;
      this.sharedService.addTransaction(this.selectedMonth, newExpense);
      this.todoForm.reset();
      this.todoForm.patchValue({ month: this.selectedMonth });
    }
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

  calculateTotalExpense(month: string): number {
    return this.sharedService.getTransactions().find(m => m.month === month)?.transactions.reduce((acc, curr) => acc + parseFloat(curr.expenseAmount), 0) || 0;
  }

  onSave() {
    this.getFilteredTransactions();
  }

  saveForm() {
    console.log("Form saved!");
  }

  onBack() {
    this.router.navigate(['/expense-tracker/dashboard']);
  }

  toggleSelection(expense: any) {
    expense.selected = !expense.selected;
  }


  editTransaction(index: number) {
    const transactions = this.getFilteredTransactions();
    this.editingIndex = index;
    this.editingTransaction = { ...transactions[index] };
  }

  saveTransaction(index: number) {
    if (this.editingIndex !== null) {
      const transactions = this.getFilteredTransactions();
      transactions[index] = this.editingTransaction;
      this.editingIndex = null;
      this.editingTransaction = {};
      this.sharedService.saveToLocalStorage();
    }
  }



  deleteTransaction(index: number) {
    //Swal Function
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this Transaction Entry',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#008080',
      cancelButtonColor: 'rgb(247, 41, 41)',
      confirmButtonText: 'Yes,Delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const transactions = this.getFilteredTransactions();
        transactions.splice(index, 1);
        this.saveToLocalStorage();
        Swal.fire(
          'Deleted',
          'The Transaction Entry is deleted',
          'success',
        )
      }
    });
  }

  cancelEdit() {
    this.editingIndex = null;
    this.editingTransaction = {};
  }
}

