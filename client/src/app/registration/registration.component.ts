import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UserAuthorizationService} from "../../api/userAuthorization.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError} from "rxjs";
import {AlertDialogComponent} from "../alert-dialog/alert-dialog.component";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  HidePass1: boolean = true;
  HidePass2: boolean = true;
  siteKey: string = '6LeAUh8mAAAAADt2mXflpVShVHyy0x1LXc1o5pXQ'
  secretKey: string = '6LeAUh8mAAAAAIl1GtQwXZZZPWAPBrDBY_K3xqfS'
  regForm: FormGroup;
  constructor(public router: Router, public dialog: MatDialog, private userService: UserAuthorizationService,) {
    this.regForm = new FormGroup({
      "email": new FormControl("", [Validators.required, Validators.email]),
      "pass1": new FormControl("", [Validators.required]),
      "pass2": new FormControl("", [Validators.required]),
      "recaptcha": new FormControl("", [Validators.required])
    })
    if(localStorage.getItem('appid') !== null){
      this.router.navigate(['/account'])
    }
  }

  Submit() {
    if(this.regForm.value['pass1'] === this.regForm.value['pass2']){
      this.userService.userPost(this.regForm.value['email'], this.regForm.value["pass1"]).pipe(catchError(err => {
        this.dialog.open(AlertDialogComponent, {
          data: {title: "Ошибка", content: "Адресс элетронной почты звнят"}
        })
        return []
      })).subscribe(value => {
        this.router.navigate(['/login'])
      })
    }
    else {
      this.dialog.open(AlertDialogComponent, {
        data: {title: "Ошибка", content: "Пароли не совпадают"}
      })
    }
  }
}
