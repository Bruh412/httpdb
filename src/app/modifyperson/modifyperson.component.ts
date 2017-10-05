import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DbService } from '../services/db.service';
import { NgForm } from '@angular/forms';
import { IPerson } from '../interfaces/iperson';

@Component({
  selector: 'app-modifyperson',
  templateUrl: './modifyperson.component.html',
  styleUrls: ['./modifyperson.component.css']
})
export class ModifypersonComponent implements OnInit {
  @Output() modifycomp = new EventEmitter<any>();

  baseURL = 'https://firstproject-4a0fc.firebaseio.com';
  rootNode = 'people';
  edit = true;
  refID: any;

  fname: string;
  lname: string;

  person: object;

  constructor(private dbService: DbService) { }

  ngOnInit() {
    this.modifycomp.emit(true);
  }

  editData(id){
     console.log(id);
     this.refID = id;
     this.dbService.getID(`${this.baseURL}/${this.rootNode}/${this.refID}.json`)
     .subscribe(
       (response) => {
           this.fname = response.firstName;
           this.lname = response.lastName;
       },
       (error) => console.log(error)
     );
  }

  updateData(formData: NgForm) {
       this.person = {
         firstName: formData.value.fname,
         lastName: formData.value.lname
       }

       alert("Updated! Change tabs to refresh");

       this.dbService.editData(`${this.baseURL}/${this.rootNode}/${this.refID}.json`,this.person)
       .subscribe(
         (response) => console.log(response),
         (error) => console.log(error)
       );
  }

}
