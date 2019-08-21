import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutingDataService {

  private staticData: any;
  private staticAdv: any;
  private staticUser: any;
  private signupData: any;

  constructor() { }

  setData(data){ this.staticData = data;}
  getData(){ return this.staticData; }

  setAdv(data){ this.staticAdv = data; }
  getAdv(){ return this.staticAdv; }

  setUser(data){ this.staticUser = data;}
  getUser(){ return this.staticUser; }

  setSignupData(data){ this.signupData = data;}
  getSignupData(){ return this.signupData; }
}
