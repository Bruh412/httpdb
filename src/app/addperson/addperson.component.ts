import { Component, OnInit } from '@angular/core';
import { DbService} from '../services/db.service';
import { IPerson } from '../interfaces/iperson';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addperson',
  templateUrl: './addperson.component.html',
  styleUrls: ['./addperson.component.css']
})
export class AddpersonComponent implements OnInit {
  baseURL = 'https://firstproject-4a0fc.firebaseio.com/';
  rootNode = 'people';
  dataCollection: IPerson[];

  constructor(private dbService: DbService) { }

  ngOnInit() {
  }

  addNameEntry(dataForm: NgForm) {
    const person = {
      firstName: dataForm.value.fname,
      lastName: dataForm.value.lname
    }
    alert("New Person Added!");
    this.dbService.saveData(`${this.baseURL}/${this.rootNode}.json`, person)
    .subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }

}
