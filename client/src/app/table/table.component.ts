import { Component } from '@angular/core';
import {Entity} from "../../model/entity";
import {EntityManagementService} from "../../api/entityManagement.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import TypeEnum = Entity.TypeEnum;
import {AlertDialogComponent} from "../alert-dialog/alert-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UpdateDialogComponent} from "../update-dialog/update-dialog.component";
import {AddDialogComponent} from "../add-dialog/add-dialog.component";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  EntityTypes: Entity.TypeEnum[] = [TypeEnum.Vegetables, TypeEnum.Fruit]
  entities: Entity[] = []
  private service: EntityManagementService;
  displayedColumns: String[] = ['id', 'name', 'type', 'actions']
  UpdateTable():void{
    this.service.entityGet().subscribe({next: value => {
      this.entities = value;
    }})
  }
  Update(entity: Entity){
    this.dialog.open(UpdateDialogComponent, {
      data: {entity: entity}
    }).afterClosed().subscribe(value => {this.UpdateTable()})
  }
  Delete(entity: Entity){
    this.dialog.open(DeleteDialogComponent, {
      data: {}
    }).afterClosed().subscribe(value => {
      if(value){
        if (entity.id != null) {
          this.service.entityDelete(entity.id).subscribe(value => {
            console.log(value)
            this.UpdateTable()
          })
        }
      }

    })

  }
  constructor(s: EntityManagementService, public dialog: MatDialog) {
    this.service = s;
    this.UpdateTable()
  }
  AddEntity() {
    this.dialog.open(AddDialogComponent, {
      data: {}
    }).afterClosed().subscribe(value => {this.UpdateTable()})
  }
}
