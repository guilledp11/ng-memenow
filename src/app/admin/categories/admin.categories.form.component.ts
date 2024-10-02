import { Component } from "@angular/core";
import { NgForm, FormControl, Validators, FormGroup, FormArray } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminCategoriesService } from "./admin.categories.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: "admin-categories-form",
    templateUrl: "admin.categories.form.component.html"
})
export class AdminCategoriesFormComponent {
    element: any = {};
    editing: boolean = false;
    categories: any[] = [];



    elementForm: FormGroup = new FormGroup({
        name: new FormControl("", {
            validators: [
                Validators.required,
                Validators.minLength(3)
            ],
            updateOn: "change"
        }),
        parentId: new FormControl("", {})
    });

    constructor(activeRoute: ActivatedRoute, private router: Router, private service: AdminCategoriesService, private snackBar: MatSnackBar) {
        activeRoute.params.subscribe(params => {
            this.editing = params["mode"] == "edit";
            let id = params["id"];
            if (id != null) {
                service.getElement(id).subscribe(p => {
                    Object.assign(this.element, p || {});
                    this.elementForm.patchValue(this.element);
                });
            }
        });

        this.service.findAllCategories(true, false).subscribe(res => {
            this.categories = res
        });
    }

    submitForm() {
        if (this.elementForm.valid) {
            Object.assign(this.element, this.elementForm.value);
            this.service.saveElement(this.element).subscribe(res => {
                this.router.navigateByUrl("/admin/categories");
                this.snackBar.open('Category has been saved succesfully', 'Close', {
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


}