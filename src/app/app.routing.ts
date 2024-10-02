import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login.component";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./auth/auth.guard";
import { HomeComponent } from "./home/home.component";
import { TimelineComponent } from "./home/timeline.component";
import { UserInfoComponent } from "./home/userInfo.component";
import { AdminCategoriesComponent } from "./admin/categories/admin.categories.component";
import { AdminCategoriesFormComponent } from "./admin/categories/admin.categories.form.component";

const childRoutes: Routes = [
    { path: "", component: TimelineComponent },
    { path: "userInfo", component:  UserInfoComponent },
    { path: "admin/categories", component: AdminCategoriesComponent},
    { path: "admin/categories/:mode/:id", component: AdminCategoriesFormComponent},
    { path: "admin/categories/:mode", component: AdminCategoriesFormComponent}
];

const routes: Routes = [
    { path: "", component: HomeComponent, canActivate: [AuthGuard], children: childRoutes},
    { path: "login", component: LoginComponent }]
export const routing = RouterModule.forRoot(routes);