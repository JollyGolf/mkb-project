import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private alertProv: AlertService,
              private router: Router) { }

  handleError(error){
    switch(error.status){
      case 403:
          localStorage.removeItem("registrationInfo");
          this.alertProv.showAlert('', 'Пользователь неактивен');
          break;
      case 409:
          localStorage.removeItem("registrationInfo");
          this.alertProv.showAlert('', 'Пользователь с таким телефоном уже существует');
          //this.router.navigate
          break;
      case 422:
          localStorage.removeItem("registrationInfo");
          this.alertProv.showAlert('', 'Ошибка');
          //this.router.navigate
          break;
      case 500:
          localStorage.removeItem("registrationInfo");
          this.alertProv.showAlert('', 'Ошибка сервера');
          //this.router.navigate
          break;
      // case 401:
      //   localStorage.removeItem("driverInfo");
      //   this.router.navigateByUrl("/login");
      //   break;
      // case 422:
      //   this.alertProv.showAlert('Ошибка!','Данные невалидны. перепроверьте и отправте снова.')
      //   break;
      // case 0:
      //   this.alertProv.showAlert('Ошибка!','Возникли проблемы с сервером или с соединением. Проверьте свое подключение к интернету и попробуйте снова!');
      //   break;
      // case 500:
      //   this.alertProv.showAlert('Ошибка!','Возникли проблемы на стороне сервера. Вскоре мы их решим!');
      //   break;
      default:
        this.alertProv.showAlert('Ошибка!','Что-то пошло не так!');
    }
  }
}
