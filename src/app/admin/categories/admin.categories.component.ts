import { HttpClient } from "@angular/common/http";
import { Component, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData, GenericDialogComponent } from "src/app/shared/modal/generic-dialog.component";
import { AdminCategoriesService } from "./admin.categories.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: "admin-categories",
    templateUrl: "admin.categories.component.html"
})
export class AdminCategoriesComponent {

    displayedColumns: string[] = ['id', 'name', 'isChild', 'subcategories', 'actions'];
    dataSource = new MatTableDataSource<any>(); // Suponiendo que 'any' es el tipo de datos que tienes

    @ViewChild(MatPaginator) 
    paginator!: MatPaginator;

    @ViewChild('extraButtonsTemplate', { static: true })
    extraButtonsTemplate!: TemplateRef<any>;

    private categories: any[] | null = null;

    private dialogRef!: MatDialogRef<GenericDialogComponent>;

    constructor(private http: HttpClient, private dialog: MatDialog, private service: AdminCategoriesService) {
        this.loadCategories();
    }

    private loadCategories() {
        this.http.get<any[]>("http://localhost:8080/api/categories/all?arrange=false").subscribe(res => {
            this.categories = res;
            this.dataSource.data = this.getCategories() || []; // Asigna los datos a la fuente
            this.dataSource.paginator = this.paginator; // Asigna el paginador
        });
    }

    getCategories(): any[] | null {
        return this.categories;
    }

    deleteCategory(id: number) {

        this.dialogRef = this.dialog.open(GenericDialogComponent, {
            width: '500px',
            data: {
                title: 'Delete category',
                message: 'Are you sure you want to delete this category? You can delete in cascade all its subcategories, or rearrange them.',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Delete and Rearrange',
                extraButtonsTemplate: this.extraButtonsTemplate,
                onCancel: () => {
                    console.log('Cancelado: La categoría no ha sido eliminada.');
                },
                onConfirm: () => {
                    console.log('Confirmado: La categoría será eliminada.');
                    // Aquí puedes realizar la lógica adicional de eliminación.
                },
            },
        });



        this.dialogRef.afterClosed().subscribe((resultado: number) => {
            console.log("Resultado: " + resultado);
            if (resultado) {
                this.categories = this.categories?.filter(category => category.id != id) || [];
                this.dataSource.data = this.dataSource.data.filter(category =>  category.id != id) || [];
                this.service.deleteElement(id, resultado == 1).subscribe(res => console.log("Eliminado con extio,"));
            }
        });
    }

    onAcceptWithConditions() {
        console.log('Aceptar con condiciones fue presionado');
        this.dialogRef.close(2);
    }


}