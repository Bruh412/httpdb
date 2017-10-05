import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DbService } from '../services/db.service';
import { IPerson } from '../interfaces/iperson';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

//import * as _ from 'underscore';  

//import { PagerService } from '../services/pager.service';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})

export class ListingComponent implements OnInit {
  @Output() modifyClicked = new EventEmitter<any>();

  @Input() edit:boolean;
  @Input() remove:boolean;

  baseURL = 'https://firstproject-4a0fc.firebaseio.com';
  rootNode = 'people';

  peopleCollection: Array<IPerson> = [];

  constructor(private dbservice: DbService) { }

  ngOnInit() {
    this.loadData();
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

  modifyData(dataID) {
    // console.log(dataID);
    this.modifyClicked.emit(dataID);
  }

  delData(dataID) {
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
