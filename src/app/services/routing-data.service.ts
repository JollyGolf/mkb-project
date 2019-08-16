import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutingDataService {

  private staticData : any;

  constructor() { }

  setData(data){
    this.staticData = data;
  }
  getData(){
    return this.staticData;
  }
}
