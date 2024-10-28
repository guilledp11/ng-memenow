import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ValidationHelper } from './validation.helper';
import { ValidationErrorsDirective } from './validationErrors.directive';
import { GenericDialogComponent } from './modal/generic-dialog.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({ declarations: [
        ValidationHelper,
        ValidationErrorsDirective,
        GenericDialogComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatMenuModule,
        NgSelectModule,
        ValidationHelper,
        ValidationErrorsDirective,
        GenericDialogComponent
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatMenuModule,
        NgSelectModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class SharedModule { }