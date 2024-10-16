// user-selector.component.ts
import { Component, OnInit, HostListener, EventEmitter, Output } from '@angular/core';
import { UserService } from '../user.service';


@Component({
    selector: 'multiple-user-selector',
    templateUrl: './user.selector.component.html',
    styleUrls: ['./user.selector.component.css'],
})
export class MultipleUserSelectorComponent implements OnInit {

    @Output() selectedUsersChange = new EventEmitter<any[]>(); 

    users: any[] = [];
    selectedUsers: any[] = [];
    searchQuery: string = '';
    page: number = 0;
    pageSize: number = 5;
    loading: boolean = false;
    hasMoreUsers = true;

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        if (this.loading) return; // Evitar múltiples cargas al mismo tiempo
        this.loading = true;

        this.userService.searchUsers(this.page, this.pageSize, this.searchQuery, this.selectedUsers).subscribe(res => {
            this.users = [...this.users, ...res.content]; // Agregar nuevos usuarios a la lista existente
            this.loading = false;
            this.page++; // Incrementar la página para la próxima carga
        });
    }

    loadMoreUsers() {
        if (!this.loading && this.hasMoreUsers) {
          this.loadUsers(); // Llama a loadUsers para cargar más usuarios
        }
      }

    onSearch() {
        this.page = 0; // Resetear a la primera página al buscar
        this.users = []; // Limpiar la lista de usuarios
        this.loadUsers(); // Cargar los usuarios basados en la búsqueda
    }

    toggleUserSelection(user: any) {
        const index = this.selectedUsers.indexOf(user);
        if (index === -1) {
            this.selectedUsers.push(user);
            this.users = this.users.filter(u => u.id !== user.id);
        } else {
            this.selectedUsers.splice(index, 1);
        }
        this.selectedUsersChange.emit(this.selectedUsers);
    }

    // Método para eliminar un usuario de la selección
    removeUser(user: any) {
        const index = this.selectedUsers.indexOf(user);
        if (index !== -1) {
            this.selectedUsers.splice(index, 1); // Eliminar el usuario de la lista seleccionada
        }
        this.selectedUsersChange.emit(this.selectedUsers);
    }
}
