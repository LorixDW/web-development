import {Component, Inject} from '@angular/core';
import {Entity} from "../../model/entity";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import TypeEnum = Entity.TypeEnum;
import {EntityManagementService} from "../../api/entityManagement.service";
import {subscribeOn} from "rxjs";

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css']
})
export class UpdateDialogComponent {
  typeList: Entity.TypeEnum[] = [TypeEnum.Vegetables, TypeEnum.Fruit]
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateData,
    private service: EntityManagementService
  ) {
    this.form = new FormGroup({
      "name": new FormControl(data.entity.name, [Validators.required]),
      "type": new FormControl(data.entity.type, [Validators.required])
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  Submit() {
    if (this.data.entity.id != null) {
      this.service.entityPut(this.data.entity.id, this.form.value["type"], this.form.value["name"]).subscribe(value => {
        console.log(value)
      })
      this.onNoClick()
      console.log(this.data.entity.id, this.form.value["type"], this.form.value["name"])
    }
  }
}
interface UpdateData{
  entity: Entity
}
