import { Component, HostListener } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { UserService } from "../user/user.service";
import { NotificationService } from "../user/notifications/notification.service";

@Component({
    selector: "home",
    templateUrl: "home.component.html",
    styleUrls: ["home.component.css"]
})
export class HomeComponent {

    user: any;
    profilePicUrl: SafeUrl | undefined;

    userSearchQuery: string = '';
    isSearchUserDropdownOpen: boolean = false;
    userSearchResults: any[] = [];

    dropdownOpen: boolean = false; // Controlar el estado del dropdown
    unreadNotifications: number = 0;

    constructor(private activeRoute: ActivatedRoute, private authService: AuthService,
        private notificationService: NotificationService,
        private userService: UserService, private sanitizer: DomSanitizer) {
        activeRoute.params.subscribe(params => {

        });
    }

    ngOnInit() {
        this.userService.findLoggedUser().subscribe(user => {
            this.user = user;
        });

        this.userService.findLoggedUserImage().subscribe(blob => {
            this.profilePicUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
        });

        this.notificationService.getNumUnreadNotifications().subscribe(res => {
            this.unreadNotifications = res;
        });
    }

    get isAdmin(): boolean {
        return this.authService.isLoggedUserAdmin();
    }

    searchUser(): void {
        if(this.userSearchQuery == null || this.userSearchQuery.length == 0) {
            this.isSearchUserDropdownOpen = false;
            return;
        }
        this.userService.searchUsers(0,4,this.userSearchQuery, []).subscribe(res => {
            this.isSearchUserDropdownOpen = res.content.length > 0; 
            this.userSearchResults = res.content;
        });
    }

    selectUser(user: string): void {
        // Lógica para manejar la selección de usuario
        console.log('Usuario seleccionado:', user);
        this.isSearchUserDropdownOpen = false; // Cierra el dropdown al seleccionar un usuario
    }

    // HostListener para cerrar el dropdown al hacer clic fuera
    @HostListener('document:click', ['$event'])
    onClick(event: MouseEvent): void {
        const target = event.target as HTMLElement;
        const isDropdown = target.closest('.search-dropdown-menu') !== null;
        const isInput = target.closest('.search-input') !== null;

        if (!isDropdown && !isInput) {
            this.isSearchUserDropdownOpen = false;
        }
    }

    showAllResults(): void {
        console.log('Mostrar todos los resultados'); // Lógica para mostrar todos los resultados
    }

    toggleDropdown(): void {
        this.dropdownOpen = !this.dropdownOpen; // Alterna el estado del dropdown
    }

    closeDropdown(): void {
        this.dropdownOpen = false; // Cierra el dropdown
    }


}