import { Component } from "@angular/core";
import { UntypedFormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from "./tokenStorage.service";

@Component({
    selector: "login",
    templateUrl: "login.component.html"
})
export class LoginComponent {
    form: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder,
        private authService: AuthService,
        private storageService: TokenStorageService,
        private router: Router, private snackBar: MatSnackBar) {

        this.form = this.fb.group({
            username: ['guillediaz11', Validators.required],
            password: ['hizupu25', Validators.required]
        });
    }

    login(): void {
        const val = this.form.value;

        if (val.username && val.password) {
            this.authService.login(val.username, val.password)
                .subscribe(
                    res => {
                        if(res) {
                            this.authService.loggedIn = true;
                            this.storageService.saveUser(res.body);
                            this.router.navigateByUrl('/');
                        } else {
                            this.authService.loggedIn = false;
                            this.snackBar.open('Nombre de usuario o contraseña incorrecta', 'Cerrar', {
                                duration: 5000,
                                panelClass: 'error-snackbar'
                            });
                        } 

                    }
                );
        }
    }
}