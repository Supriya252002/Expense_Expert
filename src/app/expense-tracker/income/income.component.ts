import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEdit, faSave, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { UserServiceService } from '../../Services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, FontAwesomeModule, HttpClientModule],
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  incomeForm: any;
  // @Output() totalIncomeChanged: EventEmitter<number> = new EventEmitter<number>();
  selectedMonth: string;
  monthSelected: boolean = false;
  faEdit = faEdit;
  faSave = faSave;
  faTrash = faTrash;
  faTimes = faTimes;
  minDateTime: string = '';
  months: string[] = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  investments: string[] = ["Stocks", "Real Estate"];
  sourceOfIncome: string[] = ["Freelancing", "Salary", "Rent Income"];
  monthlyIncomes: { month: string, incomes: any[] }[] = [];
  editingIndex: number | null = null;
  editingIncome: any = {};
  constructor(private fb: FormBuilder, public router: Router, private incomeService: UserServiceService) {
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', { month: 'long' });
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

  ngOnInit() {
    this.incomeForm = this.fb.group({
      month: ['', [Validators.required]],
      date: ['', Validators.required],
      source: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      investment: ['', [Validators.required]]
    });

    this.setMinDateTime();
    this.months.forEach(month => {
      this.monthlyIncomes.push({ month: month, incomes: [] });
    });

    this.loadFromLocalStorage();
    this.updateTotalIncome();
    this.updatecurrentMonthIncome();
  }

  // onDateTimeChange(event: any): void {
  //   const selectedDateTime = new Date(event.target.value);
  //   const now = new Date();

  //   if (selectedDateTime.toDateString() === now.toDateString()) {
  //     this.setMinDateTime();
  //   } else {
  //     this.minDateTime ='';
  //   }
  // }

  OnChange(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.updateTotalIncome();
  }

  CalculatedtotalIncome(month: string): number {
    let totalIncome = 0;
    const monthData = this.getIncomeForMonth(month);
    for (const income of monthData) {
      totalIncome += parseFloat(income.amount);
    }
    return totalIncome;
  }

  getIncomeForMonth(month: string): any[] {
    const monthData = this.monthlyIncomes.find(m => m.month === month);
    return monthData ? monthData.incomes : [];
  }

  getFilteredIncomes() {
    return this.getIncomeForMonth(this.selectedMonth);
  }

  IncomeSubmitted() {
    if (this.incomeForm.valid) {
      const newIncome = this.incomeForm.value;
      newIncome.amount = parseFloat(newIncome.amount);
      const monthData = this.getIncomeForMonth(this.selectedMonth);
      monthData.push(newIncome);
      this.saveToLocalStorage();
      this.incomeForm.reset();
      this.incomeForm.patchValue({ month: this.selectedMonth });

      this.updateMonthlyIncomes();
      // const totalIncome = this.CalculatedtotalIncome(this.selectedMonth);
      this.updateTotalIncome();
      this.updatecurrentMonthIncome();
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('monthlyIncomes', JSON.stringify(this.monthlyIncomes));
  }

  loadFromLocalStorage() {
    const retrievedData = JSON.parse(localStorage.getItem('monthlyIncomes') || '[]');
    if (retrievedData.length > 0) {
      this.monthlyIncomes = retrievedData;
    }
    this.updateMonthlyIncomes();
    this.updateTotalIncome();
    this.updatecurrentMonthIncome();
  }

  updateMonthlyIncomes() {
    const monthlyIncomesObj: { [key: string]: number } = {};
    this.monthlyIncomes.forEach(monthData => {
      monthlyIncomesObj[monthData.month] = this.CalculatedtotalIncome(monthData.month);
    });
    this.incomeService.updateIncome(monthlyIncomesObj);
  }

  updateTotalIncome() {
    const totalIncome = this.CalculatedtotalIncome(this.selectedMonth);
    this.incomeService.updateTotalIncome(totalIncome);
  }

  updatecurrentMonthIncome() {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    const totalcurrentmonthIncome = this.CalculatedtotalIncome(currentMonth);
    this.incomeService.updatecurrentMonthIncome(totalcurrentmonthIncome);
  }

  onSave() {
    console.log("Income saved successfully");
    this.updateTotalIncome();
  }

  onBack() {
    this.router.navigate(['/expense-tracker/dashboard']);
  }

  editIncome(index: number) {
    const incomes = this.getIncomeForMonth(this.selectedMonth);
    this.editingIndex = index;
    this.editingIncome = { ...incomes[index] };
  }

  saveIncome(index: number) {
    if (this.editingIndex !== null) {
      const incomes = this.getIncomeForMonth(this.selectedMonth);
      incomes[index] = this.editingIncome;
      this.editingIndex = null;
      this.editingIncome = {};
      this.saveToLocalStorage();
      this.updateTotalIncome();
    }
  }

  deleteIncome(index: number) {
    //Show confirmation
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this income entry?",
      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#008080',
      cancelButtonColor: 'rgb(247, 41, 41)',
      confirmButtonText: 'Yes, Delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const incomes = this.getIncomeForMonth(this.selectedMonth);
        incomes.splice(index, 1);
        this.saveToLocalStorage();
        this.updateTotalIncome();
        this.updatecurrentMonthIncome();
        Swal.fire(
          'Deleted!',
          'The Income Entry has been deleted.',
          'success'
        );
      }
    });
  }

  cancelEdit() {
    this.editingIndex = null;
    this.editingIncome = {};
  }
}
