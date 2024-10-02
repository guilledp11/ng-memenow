import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TokenStorageService } from "../auth/tokenStorage.service";

@Component({
    selector: "user-info",
    templateUrl: "userInfo.component.html"
})
export class UserInfoComponent {
    public username: string = "";
    public roles: string[] = [];

    constructor( activeRoute: ActivatedRoute, storageService: TokenStorageService) {
        this.username = storageService.getUser().username;
        this.roles = storageService.getUser().roles;
        activeRoute.params.subscribe(params => {
            console.log(params);
        });
    }

    ngOnInit() {
        console.log("En este instante el componente ha cargado UserInfoComponent");
      }
}