import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ExpenseTrackerModule } from './expense-tracker/expense-tracker.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { provideHttpClient } from '@angular/common/http';
@NgModule({
    declarations: [
    ],
    imports: [
        AppComponent,
        BrowserModule,
        ExpenseTrackerModule,
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        MatIconModule,
        
    ],
    providers: [
        provideHttpClient()
    ],
    bootstrap: []
})
export class AppModule { }
