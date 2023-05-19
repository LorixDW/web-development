import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EntityManagementService} from "../../api/entityManagement.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddData,
    private service: EntityManagementService
  ) {
  }
  onNoClick() {
    this.dialogRef.close()
  }
}
interface AddData{
}
