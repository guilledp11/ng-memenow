import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'meme-form',
    templateUrl: './meme.form.component.html',
    styleUrls: ['./meme.form.component.css']
})
export class MemeFormComponent implements OnInit {

    mediaPreview: string | ArrayBuffer | null | undefined = null;
    isImage: boolean = false;
    description: string = '';

    visibilityOptions = ['public', 'protected', 'private'];
    protectedOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4']; // Datos para el combo múltiple

    elementForm: FormGroup = this.fb.group({
        descripcion: ['', Validators.required],
        visibility: ['public', Validators.required],
        protectedSelection: [{ value: [], disabled: true }] // Inicialmente deshabilitado
    });

    constructor(private fb: FormBuilder) { }

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
        }
    }

    submitForm(): void {
        if (!this.mediaPreview || !this.description.trim()) {
            alert('Sube un archivo y proporciona una descripción.');
            return;
        }

        // Aquí se puede procesar la subida de datos a un servidor o realizar otras acciones
        console.log('Archivo:', this.mediaPreview);
        console.log('Descripción:', this.description);
    }

    resetForm(): void {

    }
}