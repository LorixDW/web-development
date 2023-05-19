import {Component, Inject} from '@angular/core';
import {Entity} from "../../model/entity";
import TypeEnum = Entity.TypeEnum;
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EntityManagementService} from "../../api/entityManagement.service";

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent {
  typeList: Entity.TypeEnum[] = [TypeEnum.Vegetables, TypeEnum.Fruit]
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddData,
    private service: EntityManagementService
  ) {
    this.form = new FormGroup({
      "name": new FormControl("", [Validators.required]),
      "type": new FormControl("", [Validators.required])
    })
  }
  onNoClick() {
    this.dialogRef.close()
  }
  Submit() {
    this.service.entityPost(this.form.value["type"], this.form.value["name"]).subscribe(value => {
      console.log(value)
    })
    this.onNoClick()
  }
}
interface AddData{
}
