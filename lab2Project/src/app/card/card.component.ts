import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CardServiceService} from "../card-service.service";
import {Card} from "./Card";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{
  cards: Card[] = [];
  response: any;
  constructor(private cardService: CardServiceService) {
  }
  ngOnInit(): void {
    this.cardService.getData().subscribe((cards:Card[]) => {
      this.cards = cards;
    });
    this.Api().then(({message, status}) => this.response = message)
  }
  Api():Promise<{message: string, status: string}>{
    return fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => {
        if(response.ok){
          console.log(response.statusText)
        }
        return response.json()
      })
  }
}
