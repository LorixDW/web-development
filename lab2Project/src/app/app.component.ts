import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  n: number = 10;
  title = 'lab2Project';
  mass: number[] = this.CreateMass(this.n);

  CreateMass(n: number): number[]{
    let mass: number[] = [];
    while (mass.length < n) {
      mass.push(0);
    }
    return mass;
  }

  Extend(){
    this.n += 10
    this.mass = this.CreateMass(this.n);
  }
}
