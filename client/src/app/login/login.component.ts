import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EntityManagementService} from "../../api/entityManagement.service";
import {UserAuthorizationService} from "../../api/userAuthorization.service";
import {UserInfo} from "../../model/userInfo";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AlertDialogComponent} from "../alert-dialog/alert-dialog.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  HidePass: boolean = true
  CanResend: boolean = false
  form: FormGroup;
  appid: string= "";
  ResendTimer: number = 0;

  siteKey: string = '6LeAUh8mAAAAADt2mXflpVShVHyy0x1LXc1o5pXQ'
  secretKey: string = '6LeAUh8mAAAAAIl1GtQwXZZZPWAPBrDBY_K3xqfS'

  Submit(){
    this.userService.userGet(this.form.value['email'], this.form.value['password']).pipe(catchError(err => {
      this.dialog.open(AlertDialogComponent, {
        data: {title: "Ошибка", content: "Неверный пароль или адресс электронной почты"}
      })
      return [];
    })).subscribe(value => {
      console.log()
      // @ts-ignore
      this.appid = value.appid
      localStorage.setItem('appid', this.appid)
      this.router.navigate(['/account'])
    })
  }

  constructor(private router: Router, private userService: UserAuthorizationService, private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.form = new FormGroup({
      "email": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", [Validators.required]),
      "recaptcha": new FormControl("", [Validators.required])
    })
    if(localStorage.getItem('appid') !== null){
      this.router.navigate(['/account'])
    }
  }
}
