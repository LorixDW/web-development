import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Card} from "./card/Card";
@Injectable({
  providedIn: 'root'
})
export class CardServiceService {
  constructor(private http: HttpClient) { }
  getData():Observable<Card[]>{
    return this.http.get("https://dog.ceo/api/breeds/image/random") as Observable<Card[]>;
  }
}
