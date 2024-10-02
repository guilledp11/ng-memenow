import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router, CanActivate } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(): boolean {
      if (!this.authService.loggedIn) {
        this.router.navigate(['/login']);
        return false;
      }
  
      return true;
    }
  }
  