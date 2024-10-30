import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { VisualizationGroupsComponent } from "./visualization-groups/visualization.groups.component";
import { VisualizationGroupsFormComponent } from "./visualization-groups/visualization.groups.form.component";
import { VisualizationGroupsService } from "./visualization-groups/visualization.groups.service";
import { RouterModule } from "@angular/router";
import { UserService } from "./user.service";
import { UserProfileComponent } from "./profile/user.profile.component";
import { MemeService } from "./meme.service";
import { CommentService } from "./comment.service";
import { MemeComponent } from "./memes/meme.component";
import { MemeFormComponent } from "./memes/meme.form.component";
import { KeywordInputComponent } from "./memes/keywords/keyword.input.component";
import { NotificationService } from "./notifications/notification.service";
import { NotificationsInboxComponent } from "./notifications/notificacions-inbox.component";

@NgModule({
    declarations: [
        VisualizationGroupsComponent, VisualizationGroupsFormComponent, UserProfileComponent, MemeComponent, MemeFormComponent, KeywordInputComponent, NotificationsInboxComponent
    ],
    imports: [
        RouterModule,
        SharedModule
    ],
    exports: [MemeComponent],
    providers: [VisualizationGroupsService, UserService, MemeService, CommentService, NotificationService],
})
export class UserModule { }