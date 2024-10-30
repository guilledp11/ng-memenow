import { Component } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { VisualizationGroupsService } from "./visualization.groups.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "../user.service";
import { Observable } from "rxjs";

@Component({
    selector: "visualization-groups-form",
    templateUrl: "visualization.groups.form.component.html",
    styleUrls: ['./visualization.groups.form.component.css']
})
export class VisualizationGroupsFormComponent {

    element: any = {};
    editing: boolean = false;
    initialSelectedUsers: any[] = [];
    selectedUsersLoaded: boolean = false;
    contactGroups: any[] = [{
        "id": 0, "name": "Contact group 1"
    }];



    elementForm: UntypedFormGroup = new UntypedFormGroup({
        name: new UntypedFormControl("", {
            validators: [
                Validators.required,
                Validators.minLength(3)
            ],
            updateOn: "change"
        }),
        attached: new UntypedFormControl("", {})
    });

    constructor(activeRoute: ActivatedRoute, private router: Router, private service: VisualizationGroupsService, private userService: UserService, private snackBar: MatSnackBar) {
        activeRoute.params.subscribe(params => {
            this.editing = params["mode"] == "edit";
            let id = params["id"];
            if (id != null) {
                service.getElement(id).subscribe(p => {
                    Object.assign(this.element, p || {});
                    this.elementForm.patchValue(this.element);
                    this.initialSelectedUsers = p.contacts;
                    this.selectedUsersLoaded = true;
                    this.element.updatingContacts = true;
                });
            }
        });

        //this.service.findAllContactGroups().subscribe(res => this.contactGroups = res) 
    }

    submitForm() {
        if (this.elementForm.valid) {
            Object.assign(this.element, this.elementForm.value);
            this.service.saveElement(this.element).subscribe(res => {
                this.router.navigateByUrl("/user/visualization-groups");
                this.snackBar.open('Visualization group has been saved succesfully', 'Close', {
                    duration: 5000,
                    panelClass: 'error-snackbar'
                });
            });

        }
    }

    resetForm() {
        this.editing = true;
        this.element = {};
        this.elementForm.reset();
    }

    getPreviousElementId(id?: number): number {
        if (id != null && id != undefined) {
            return id + 1;
        }
        return 0;
    }

    getNextElementId(id?: number): number {
        if (id != null && id != undefined && id < 1) {
            return id - 1;
        }
        return 0;
    }

    onUsersSelected(users: any[]) {
        this.element.contactsIds = users.map(user => user.id);
    }

    fetchUsers(page: number, pageSize: number, searchQuery: string, selectedItems: any[]): Observable<any> {
        return this.userService.searchUsers(page, pageSize, searchQuery, selectedItems);
    }
}