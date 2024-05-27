import {  Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero.interfaces';

@Component({
  selector: 'app-dialog',
  template: `
  
  <h2 mat-dialog-title>Estas seguro?</h2>
  <mat-dialog-content>
  <p> Este proceso no es reversible, esta apunto de eleminar a <strong> {{data.superhero}} </strong> </p>
 
  </mat-dialog-content>
  <mat-dialog-actions>
  <button mat-button (click)="onNoClick()">No Thanks</button>
  <span class="spacer"></span>
  <button mat-button (click)="onNoConfirm()"cdkFocusInitial>Ok</button>
  </mat-dialog-actions>
  

  
  `,
})
export class DialogComponent {


  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Hero,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }


  onNoConfirm(): void {
    this.dialogRef.close(true);
  }


 }
