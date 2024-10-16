import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { VisualizationGroupsComponent } from "./visualization-groups/visualization.groups.component";
import { VisualizationGroupsFormComponent } from "./visualization-groups/visualization.groups.form.component";
import { VisualizationGroupsService } from "./visualization-groups/visualization.groups.service";
import { RouterModule } from "@angular/router";
import { MultipleUserSelectorComponent } from "./visualization-groups/user.selector.component";
import { UserService } from "./user.service";

@NgModule({
    declarations: [
        VisualizationGroupsComponent, VisualizationGroupsFormComponent, MultipleUserSelectorComponent
    ],
    imports: [
        RouterModule,
        SharedModule
    ],
    providers: [VisualizationGroupsService, UserService],
})
export class UserModule { }