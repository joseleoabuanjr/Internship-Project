import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/core/models/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  dataCollected:any = this.data;

  onSubmit(){
    this.data.submit = true;
    this.dialogRef.close(this.data.submit);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
