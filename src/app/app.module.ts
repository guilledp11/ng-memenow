import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './auth/login.component';
import { RouterModule } from "@angular/router";
import { routing } from './app.routing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './home/home.component';
import { httpInterceptorProviders } from './auth/httpRequest.interceptor';
import { TimelineComponent } from './home/timeline.component';
import { UserInfoComponent } from './home/userInfo.component';
import { AdminCategoriesComponent } from './admin/categories/admin.categories.component';
import { AdminCategoriesService } from './admin/categories/admin.categories.service';
import { ValidationHelper } from './shared/validation.helper';
import { ValidationErrorsDirective } from './shared/validationErrors.directive';
import { AdminCategoriesFormComponent } from './admin/categories/admin.categories.form.component';
import { GenericDialogComponent } from './shared/modal/generic-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, HomeComponent, TimelineComponent, UserInfoComponent, AdminCategoriesComponent, ValidationHelper, 
    ValidationErrorsDirective, AdminCategoriesFormComponent, GenericDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, RouterModule, routing,
    MatSnackBarModule, MatDialogModule, MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule
  ],
  providers: [AuthService, httpInterceptorProviders, AdminCategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
