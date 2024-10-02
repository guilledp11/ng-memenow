import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable, shareReplay } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { TokenStorageService } from "./tokenStorage.service";

@Injectable()
export class AuthService {

    public loggedIn: boolean = false;

    constructor(private http: HttpClient, private storageService: TokenStorageService) {
    }

    login(username: string, password: string): Observable<any> {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true,
            observe: 'response' as const
        }; 
        return this.http.post<any>('http://localhost:8080/api/auth/login', { "user": username, "password": password }, options);
    }

    isLoggedUserAdmin(): boolean {
        return this.storageService.getUser().roles?.includes("ADMIN");
    }
}