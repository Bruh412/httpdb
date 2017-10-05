import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DbService } from '../services/db.service';
import { IPerson } from '../interfaces/iperson';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-removeperson',
  templateUrl: './removeperson.component.html',
  styleUrls: ['./removeperson.component.css']
})
export class RemovepersonComponent implements OnInit {
  @Output() modifyClicked = new EventEmitter<any>();

  baseURL = 'https://firstproject-4a0fc.firebaseio.com';
  remove:boolean = true;
  rootNode = 'people';

  peopleCollection: Array<IPerson> = [];

  constructor(private dbservice: DbService) { }

  ngOnInit() {
    this.loadData();
    this.modifyClicked.emit(true);
  }

  loadData() { 
     this.dbservice.getAllData(`${this.baseURL}/${this.rootNode}.json`)
     .subscribe(
       (response) => {
         this.peopleCollection = response;
        } ,
       (error) => console.log(error)
     );
  }

  delData(dataID) {
    //console.log(this.baseURL);console.log(this.rootNode);console.log(dataID);
    //this.modifyClicked.emit(dataID);
    //this.dbservice.getID(`${this.baseURL}/${this.rootNode}/${this.refID}.json`)

    if(confirm("Would you like to delete this record?")==true)
      if (confirm("Are you sure?")==true)
        {
          alert("Deleted! Change tabs to refresh");
          this.dbservice.deleteData(`${this.baseURL}/${this.rootNode}/${dataID}.json`).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
          );
        }
      else alert("Delete cancelled");
      else alert("Delete cancelled");
  }
}

