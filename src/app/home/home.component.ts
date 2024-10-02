import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
    selector: "home",
    templateUrl: "home.component.html",
    styleUrls: ["home.component.css"]
})
export class HomeComponent {

    dropdownOpen: boolean = false; // Controlar el estado del dropdown

    constructor(private activeRoute: ActivatedRoute, private authService: AuthService) {
        activeRoute.params.subscribe(params => {
            console.log(params);
        });
    }

    ngOnInit() {
        console.log("En este instante el componente ha cargado HomeComponent");
    }

    get isAdmin(): boolean {
        return this.authService.isLoggedUserAdmin();
    }

    toggleDropdown(): void {
        this.dropdownOpen = !this.dropdownOpen; // Alterna el estado del dropdown
    }

    closeDropdown(): void {
        this.dropdownOpen = false; // Cierra el dropdown
    }
}