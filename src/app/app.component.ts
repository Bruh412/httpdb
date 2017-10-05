import { IPerson } from './interfaces/iperson';
import { DbService } from './services/db.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  baseURL = 'https://first-project-21048.firebaseio.com';
  rootNode = 'people';
  dataCollection: IPerson[];

  constructor(private dbService: DbService) {}



  retrieve() {
    this.dbService.getAllData(`${this.baseURL}/${this.rootNode}.json`)
    .subscribe(
      (response: IPerson[]) => {
        this.dataCollection = response;
        console.log(this.dataCollection);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
