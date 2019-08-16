import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private mainUrl:string = 'http://4.dev-kit.ru:3000/';
  public apiUrl: string = 'http://4.dev-kit.ru:3000/api/client/';

  constructor() { }
}
