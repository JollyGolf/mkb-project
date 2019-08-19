import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutingDataService {

  private staticData: any;
  private staticAdv: any;

  constructor() { }

  setData(data){
    this.staticData = data;
  }
  getData(){
    return this.staticData;
  }
  setAdv(data) {
    this.staticAdv = data;
  }
  getAdv(){
    return this.staticAdv;
  }
}
