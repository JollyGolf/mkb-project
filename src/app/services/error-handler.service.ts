import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private alertProv: AlertService,
    private router: Router
  ) { }

  handleError(error){
    switch(error.status){
      case 401: 
          this.alertProv.showAlert('', 'Такой токен не существует');
          this.router.navigate(['log-in']);
          break;
      case 403:
          localStorage.removeItem("registrationInfo");
          this.alertProv.showAlert('', 'Пользователь неактивен');
          break;
      case 409:
          localStorage.removeItem("registrationInfo");
          this.alertProv.showAlert('', 'Пользователь с таким телефоном уже существует');
          break;
      case 422:
          localStorage.removeItem("registrationInfo");
          this.alertProv.showAlert('', 'Данные введены неверно');
          break;
      case 500:
          localStorage.removeItem("registrationInfo");
          this.alertProv.showAlert('', 'Ошибка сервера');
          break;
      default:
        this.alertProv.showAlert('Ошибка!','Что-то пошло не так!');
    }
  }
}
