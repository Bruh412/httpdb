import { IPerson } from './../interfaces/iperson';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/Rx';

@Injectable()
export class DbService {

  constructor(private http: Http) { }

  saveData(destURI: string, dataSet: any, headers: any = null) {
    return this.http.post(
      destURI, dataSet, headers
    )
    .catch(
      (error: Response) => {
        return Observable.throw(error);
      }
    );
  }

  editData(destURI: string, dataSet: any, headers: any = null) {
    return this.http.put(
      destURI, dataSet, headers
    )
    .catch(
      (error: Response) => {
        return Observable.throw(error);
      }
    );
  }

  deleteData(destURI: string, headers: any = null) {
    return this.http.delete(
      destURI, headers
    )
    .catch (
      (error: Response) => {
        return Observable.throw(error);
      }
    );
  }

  getAllData(sourceURI: string, headers: any = null) {
    return this.http.get(sourceURI, headers)
    .map(
       (response: Response) => {
         const jsonData = response.json();
         return this.convertJArray(jsonData);
       }
    )
    .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
    );
  }

  getID(sourceURI: string, headers: any = null) {
       return this.http.get(sourceURI, headers)
       .map(
         (response: Response) => {
           return response.json();
         }
       )
       .catch(
         (error: Response) => {
           return Observable.throw(error);
         }
       );
  }

  //Convert a JSON Object into a JSON Array that is Iteratable
  private convertJArray(jsondata: object): Array<object> {
        return Object.keys(jsondata)
        .map(
          (keys) => {

            const newDataset = jsondata[keys];
            newDataset['id'] = keys;

            return newDataset;
          }
        );
  }


}
