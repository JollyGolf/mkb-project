import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { ConfigService } from './config.service';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { NavController } from '@ionic/angular';
import { RoutingDataService } from './routing-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(
    private http: HttpClient,
    private loaderProv: LoaderService,
    private errorProv: ErrorHandlerService,
    private router: Router,
    private alertProv: AlertService,
    private navCtrl: NavController,
    private configProv: ConfigService,
    private routerDataProv: RoutingDataService
  ) { }

  login(data){
    const {phone, password} = data
    const head = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if(phone == '' || password == ''){
      this.alertProv.showAlert('', 'Вы не ввели телефон или пароль!');
    }
    else {
      //console.log('{ Request }: ', data);
      this.loaderProv.showSend();
      this.http.post(this.configProv.apiUrl + "login", data, {headers: head}).subscribe(
        (data: any) => {
          //console.log('{ Response }: ', data);
          this.loaderProv.dismiss();
          localStorage.setItem("userToken", data.body.token);
          this.router.navigateByUrl('/handlbook');
        },
        err => {
          this.loaderProv.dismiss();
          this.errorProv.handleError(err);
        }
      );
    }
  }

  registration(data){
    const { phone, name, password, password_confirm } = data;
    
    if(phone == '' || name == '' || password == '' || password_confirm == ''){
      this.alertProv.showAlert('', 'Все поля обязательны и должны быть заполнены! Иначе регистрация не будет полностью завершена!');
    }
    // else if(!phone.match("^\+380\d{7}$")){
    //   this.alertProv.showAlert('', 'Неправильный тип номера телефона');
    // }
    else if(password.length < 4) {
      this.alertProv.showAlert('', 'Пароль слишком короткий');
    }
    else if(password !== password_confirm) {
      this.alertProv.showAlert('', 'Пароли должны соответствовать! Будьте внимательны!');
    }
    else {
      //console.log('{ Request }: ', data);
      this.loaderProv.showSend();
      this.http.post(this.configProv.apiUrl + "registration", data).subscribe(
        (data: any) => {
          console.log('{ Response }: ', data);
          this.loaderProv.dismiss();
          this.routerDataProv.setData({ phone, password });
          this.router.navigateByUrl('/confirm-sign-up');
        },
        err => {
          this.loaderProv.dismiss();
          this.errorProv.handleError(err);
        }
      ); 
    }    
  }

  registrationConfirm( code: string) {
    this.loaderProv.showSend();
    const phone = this.routerDataProv.getData().phone;
      let dataConfirm = { phone, code }
      this.http.post(this.configProv.apiUrl + "registration_confirm", dataConfirm).subscribe(
        data => {
          console.log('{ Response }: ', data);
          this.loaderProv.dismiss();
          this.router.navigateByUrl('/success-sign-up');
        },
        err => {
          this.loaderProv.dismiss();
          this.errorProv.handleError(err);
        }
      ); 
  }

  // sendCode(phone: string) {
  //   const data = { phone };
  //   this.http.post(this.configProv.apiUrl + "password_send_code", data).subscribe(
  //     data => {
  //       console.log('send', data);
  //     },
  //     err => {
  //       console.log('send error', err);
  //     }
  //   );
  // }

  // checkCode() {

  // }

  // setNewPassword() {
    
  // }

  getAdv() {
    this.loaderProv.showSend();
    this.http.get(this.configProv.apiUrl + "adv").subscribe(
      (data: any ) => {
        this.loaderProv.dismiss();
        this.routerDataProv.setAdv(data.body[Math.floor(Math.random() * data.body.length)]);
      },
      err => {
        this.loaderProv.dismiss();
        this.errorProv.handleError(err);
      }
    );
  }





//   changePassword(data){
//     this.loaderProv.showSend();
//     const head = {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
//     this.http.put(this.configProv.apiUrl + "recoveryPassword",data, {headers: head}).subscribe(
//       data => {
//         this.loaderProv.dismiss();
//         this.alertProv.showAlert('Успех','Пароль изменен!');
//         this.navCtrl.pop();
//       },
//       err => {
//         this.loaderProv.dismiss();
//         this.errorProv.handleError(err);
//       }
//     );
//   }

//   logout(){
//     const userData = JSON.parse(localStorage.getItem("driverInfo"));
//     if(userData && userData['access_token']){
//       this.loaderProv.showSend();
//       const head = {
//         'Authorization': `${userData['token_type']} ${userData['access_token']}`,
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       }
//       this.http.post(this.configProv.apiUrl + "drivers/logout", null, {headers: head}).subscribe(
//         data => {
//           this.loaderProv.dismiss();
//           localStorage.removeItem("driverInfo");
//           this.router.navigateByUrl('/login');
//         },
//         err => {
//           this.loaderProv.dismiss();
//           this.errorProv.handleError(err);
//         }
//       );
//     } else {
//       localStorage.removeItem("driverInfo");
//       this.alertProv.showAlert('Ошибка!', 'Токен авторизации не найден. Необходимо перезайти в аккаунт!');
//       this.router.navigateByUrl('/login');
//     }

//   }
}
