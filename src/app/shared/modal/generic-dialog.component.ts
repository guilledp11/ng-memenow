import { Component, Inject, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  message: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onCancel?: () => void; // Callback para cancelar
  onConfirm?: () => void; // Callback para aceptar
  extraButtonsTemplate?: TemplateRef<any>;
}

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
})
export class GenericDialogComponent {

  title: string;
  message: string;
  cancelButtonText: string;
  confirmButtonText: string;
  extraButtonsTemplate?: TemplateRef<any>;
  onCancel?: () => void; // Callback para cancelar
  onConfirm?: () => void; // Callback para aceptar

  constructor(
    public dialogRef: MatDialogRef<GenericDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.title = data.title;
    this.message = data.message;
    this.cancelButtonText = data.cancelButtonText || 'Cancel';
    this.confirmButtonText = data.confirmButtonText || 'Confirm';
    this.extraButtonsTemplate = data.extraButtonsTemplate;
    this.onCancel = data.onCancel;
    this.onConfirm = data.onConfirm;
  }

  handleCancel(): void {
    if (this.onCancel) {
      this.onCancel(); // Llama a la función de cancelación
    }
    this.dialogRef.close(0);
  }

  handleConfirm(): void {
    if (this.onConfirm) {
      this.onConfirm(); // Llama a la función de aceptación
    }
    this.dialogRef.close(1);
  }
}