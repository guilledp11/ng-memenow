import { Component, OnInit } from '@angular/core';
import { setActiveConsumer } from '@angular/core/primitives/signals';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AdminCategoriesService } from 'src/app/admin/categories/admin.categories.service';
import { VisualizationGroupsService } from '../visualization-groups/visualization.groups.service';
import { MemeService } from '../meme.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'meme-form',
    templateUrl: './meme.form.component.html',
    styleUrls: ['./meme.form.component.css']
})
export class MemeFormComponent implements OnInit {

    editing: boolean = false;
    selectedFile! : File;

    selectedCategoriesLoaded: boolean = true;
    initialSelectedCategories: any[] = [];
    selectedVisualizationGroupsLoaded: boolean = true;
    initialSelectedVisualizationGroups: any[] = [];

    mediaPreview: string | ArrayBuffer | null | undefined = null;
    isImage: boolean = false;

    visibilityOptions = ['PUBLICO', 'PROTEGIDO', 'PRIVADO'];

    meme: any = {};

    elementForm: UntypedFormGroup = this.fb.group({
        description: ['', Validators.required],
        visibility: ['public', Validators.required],

    });

    constructor(private fb: UntypedFormBuilder, private categoryService: AdminCategoriesService,
        private router: Router, private snackBar: MatSnackBar,
        private visualizationGroupService: VisualizationGroupsService, private memeService: MemeService) { }

    ngOnInit(): void {
        this.elementForm.get('visibility')?.valueChanges.subscribe(value => {
            const protectedSelection = this.elementForm.get('protectedSelection');
            if (value === 'protected') {
                protectedSelection?.enable();
            } else {
                protectedSelection?.disable();
            }
        });
    }


    onFileSelected(event: Event): void {
        const file = (event.target as HTMLInputElement).files?.[0];

        if (file) {
            const reader = new FileReader();
            this.isImage = file.type.startsWith('image');

            reader.onload = (e) => {
                this.mediaPreview = e.target?.result;
            };

            reader.readAsDataURL(file);
            this.selectedFile = file;
        }
    }

    submitForm(): void {
        if (this.elementForm.valid) {
            Object.assign(this.meme, this.elementForm.value);
            if (this.selectedFile) {
                const formData = new FormData();
                formData.append('file', this.selectedFile, this.selectedFile.name); // Adjuntar el archivo original
                formData.append('data', JSON.stringify(this.meme));

                this.memeService.save(formData).subscribe(res => {
                    this.router.navigateByUrl("/user/profile");
                this.snackBar.open('Meme has been posted succesfully', 'Close', {
                    duration: 5000,
                    panelClass: 'error-snackbar'
                });
                }, resmal => {
                    this.snackBar.open('There has been an error during save', 'Close', {
                        duration: 5000,
                        panelClass: 'error-snackbar'
                    });
                });
            }
        }


    }

    resetForm(): void {

    }

    onCategoriesSelected(categories: any[]) {
        this.meme.categoriesIds = categories.map(category => category.id);
    }

    fetchCategories(page: number, pageSize: number, searchQuery: string, selectedItems: any[]): Observable<any> {
        return this.categoryService.search(page, pageSize, searchQuery);
    }

    onVisualizationGroupsSelected(visualizationGroups: any[]) {
        this.meme.visualizationGroupsIds = visualizationGroups.map(visualizationGroup => visualizationGroup.id);
    }

    fetchVisualizationGroups(page: number, pageSize: number, searchQuery: string, selectedItems: any[]): Observable<any> {
        return this.visualizationGroupService.search(page, pageSize, searchQuery, selectedItems);
    }

    onKeywordsChange(keywords: string[]): void {
        this.meme.keywords = keywords;
    }
}