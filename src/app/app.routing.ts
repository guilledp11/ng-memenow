import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login.component";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./auth/auth.guard";
import { HomeComponent } from "./home/home.component";
import { TimelineComponent } from "./home/timeline.component";
import { AdminCategoriesComponent } from "./admin/categories/admin.categories.component";
import { AdminCategoriesFormComponent } from "./admin/categories/admin.categories.form.component";
import { VisualizationGroupsComponent } from "./user/visualization-groups/visualization.groups.component";
import { VisualizationGroupsFormComponent } from "./user/visualization-groups/visualization.groups.form.component";
import { UserProfileComponent } from "./user/profile/user.profile.component";
import { MemeComponent } from "./user/memes/meme.component";
import { MemeFormComponent } from "./user/memes/meme.form.component";
import { NotificationsInboxComponent } from "./user/notifications/notificacions-inbox.component";

const childRoutes: Routes = [
    { path: "", component: TimelineComponent },
    { path: "user/profile", component:  UserProfileComponent },
    { path: "profile/:username", component:  UserProfileComponent },
    { path: "user/visualization-groups", component: VisualizationGroupsComponent},
    { path: "user/visualization-groups/:mode/:id", component: VisualizationGroupsFormComponent},
    { path: "user/visualization-groups/:mode", component: VisualizationGroupsFormComponent},
    { path: "meme/create", component: MemeFormComponent},
    { path: "meme/:id", component: MemeComponent},
    { path: "notifications/inbox", component: NotificationsInboxComponent},
    { path: "admin/categories", component: AdminCategoriesComponent},
    { path: "admin/categories/:mode/:id", component: AdminCategoriesFormComponent},
    { path: "admin/categories/:mode", component: AdminCategoriesFormComponent}
];

const routes: Routes = [
    { path: "", component: HomeComponent, canActivate: [AuthGuard], children: childRoutes},
    { path: "login", component: LoginComponent }]
export const routing = RouterModule.forRoot(routes);