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
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ValidationHelper } from './validation.helper';
import { ValidationErrorsDirective } from './validationErrors.directive';
import { GenericDialogComponent } from './modal/generic-dialog.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MultipleSelectorComponent } from './multiple-selector/multiple.selector.component';

@NgModule({ declarations: [
        ValidationHelper,
        ValidationErrorsDirective,
        GenericDialogComponent,
        MultipleSelectorComponent
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
        MatChipsModule,
        MatInputModule,
        NgSelectModule,
        ValidationHelper,
        ValidationErrorsDirective,
        GenericDialogComponent,
        MultipleSelectorComponent
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
        MatChipsModule,
        MatInputModule,
        NgSelectModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class SharedModule { }