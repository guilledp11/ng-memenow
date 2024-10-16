import { HttpClient } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { GenericDialogComponent } from "src/app/shared/modal/generic-dialog.component";
import { VisualizationGroupsService } from "./visualization.groups.service";

@Component({
    selector: "visualization-groups",
    templateUrl: "visualization.groups.component.html"
})
export class VisualizationGroupsComponent {

    displayedColumns: string[] = ['id', 'name', 'attached', 'numUsers', 'actions'];

    dataSource = new MatTableDataSource<any>(); // Suponiendo que 'any' es el tipo de datos que tienes

    @ViewChild(MatPaginator) 
    paginator!: MatPaginator;

    private visualizationGroups: any[] | null = null;

    private dialogRef!: MatDialogRef<GenericDialogComponent>;

    constructor(private http: HttpClient, private dialog: MatDialog, private service: VisualizationGroupsService) {
        this.loadVisualizationGroups();
    }

    private loadVisualizationGroups() {
        this.service.findAll().subscribe(res => {
            this.visualizationGroups = res;
            this.dataSource.data = this.getVisualizationGroups() || []; 
            this.dataSource.paginator = this.paginator;
        });
    }

    getVisualizationGroups(): any[] | null {
        return this.visualizationGroups;
    }

    deleteVisualizationGroup(id: number) {

        this.dialogRef = this.dialog.open(GenericDialogComponent, {
            width: '500px',
            data: {
                title: 'Delete category',
                message: 'Are you sure you want to delete this visualization group? This will make all the protected memes that only depend on it become private.',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Delete',
                onCancel: () => {
                    console.log('Cancelado: El elemento no ha sido eliminado.');
                },
                onConfirm: () => {
                    console.log('Confirmado: El elemento será eliminado.');
                    // Aquí puedes realizar la lógica adicional de eliminación.
                },
            },
        });

        this.dialogRef.afterClosed().subscribe((resultado: number) => {
            if (resultado) {
                this.visualizationGroups = this.visualizationGroups?.filter(visualizationGroup => visualizationGroup.id != id) || [];
                this.dataSource.data = this.dataSource.data.filter(visualizationGroup =>  visualizationGroup.id != id) || [];
                this.service.deleteElement(id).subscribe(res => console.log("Eliminado con extio,"));
            }
        });
    }
}