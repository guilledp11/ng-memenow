import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './auth/login.component';
import { RouterModule } from "@angular/router";
import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';
import { httpInterceptorProviders } from './auth/httpRequest.interceptor';
import { TimelineComponent } from './home/timeline.component';
import { AdminCategoriesComponent } from './admin/categories/admin.categories.component';
import { AdminCategoriesService } from './admin/categories/admin.categories.service';
import { AdminCategoriesFormComponent } from './admin/categories/admin.categories.form.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, HomeComponent, TimelineComponent, AdminCategoriesComponent, AdminCategoriesFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule, routing,
    SharedModule, UserModule
  ],
  providers: [AuthService, httpInterceptorProviders, AdminCategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
