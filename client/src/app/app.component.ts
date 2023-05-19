import { Component } from '@angular/core';
import {APIS, EntityManagementService} from "../api/api";
import {Entity} from "../model/entity";
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogined: boolean = false;
  appid: string = ""
  loginClick(){
    this.router.navigate(['/login'])
  }
  regClick(){
    this.router.navigate(['/registration'])
  }
  constructor(public router: Router) {
    router.events.subscribe(event => {
      if(event instanceof NavigationStart){
        if(localStorage.getItem('appid') !== null){
          this.isLogined = true
          // @ts-ignore
          this.appid = localStorage.getItem('appid')
        }
        else {
          this.appid = ""
          this.isLogined = false
        }
      }
    })
  }

  accountClick() {
    this.router.navigate(['/account'])
  }

  exitClick() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
