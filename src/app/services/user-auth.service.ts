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
      this.loaderProv.showSend();
      this.http.post(this.configProv.apiUrl + "login", data, {headers: head}).subscribe(
        (data: any) => {
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
    else if(password.length < 3) {
      this.alertProv.showAlert('', 'Пароль слишком короткий');
    }
    else if(password !== password_confirm) {
      this.alertProv.showAlert('', 'Пароли должны соответствовать! Будьте внимательны!');
    }
    else {
      this.loaderProv.showSend();
      
      this.http.post(this.configProv.apiUrl + "registration", data).subscribe(
        (data: any) => {
          console.log('{ Response }: ', data);
          this.loaderProv.dismiss();
          this.routerDataProv.setSignupData({ phone });
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

  registrationResendCode(){
    this.loaderProv.showSend();
    this.http.post(this.configProv.apiUrl + "registrationCode", this.routerDataProv.getSignupData()).subscribe(
      (data: any) => {
        console.log('Resend:', data);
        this.loaderProv.dismiss();
      },
      err => {
        this.loaderProv.dismiss();
        this.errorProv.handleError(err);
      }
    );     
  }

  registrationConfirm(code: string) {
    if(code == ''){
      this.alertProv.showAlert('', 'Введите код. Поле не должно быть пустое!');
    }
    else {
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
  }

  sendCode(data: any) {
    let { phone } = data;
    this.loaderProv.showSend();
    this.http.post(this.configProv.apiUrl + "password_send_code", data).subscribe(
      (data: any) => {
        this.loaderProv.dismiss();
        console.log('send', data);
        this.routerDataProv.setData(phone);
        this.router.navigate(['message-recovery']);
      },
      err => {
        this.loaderProv.dismiss();
        this.errorProv.handleError(err);
      }
    );
  }

  resendCode() {
    let data = { phone: this.routerDataProv.getData() };
    this.loaderProv.showSend();
    this.http.post(this.configProv.apiUrl + "password_send_code", data).subscribe(
      (data: any) => {
        this.loaderProv.dismiss();
        console.log('resend', data);
      },
      err => {
        this.loaderProv.dismiss();
        this.errorProv.handleError(err);
      }
    );
  }

  checkCode(code: string) {
    const data = {  
      phone: this.routerDataProv.getData(),
      code
    };
    this.loaderProv.showSend();
    this.http.post(this.configProv.apiUrl + "password_check_code", data).subscribe(
      data => {
        this.loaderProv.dismiss();
        console.log('Success => ', data);
        this.router.navigate(['new-password-recovery']);
      },
      err => {
        this.loaderProv.dismiss();
        this.errorProv.handleError(err);
      }
    );
  }

  updatePassword(password: string, password_confirm: string) {
    if(password == '' || password_confirm == '') {
      this.alertProv.showAlert('','Все поля должны быть заполнены!');
    }
    else if (password.length < 3){
      this.alertProv.showAlert('','Пароль слишком короткий!');
    }
    else if(password !== password_confirm){
      this.alertProv.showAlert('','Пароли должны совпадать!');
    }
    else {
      const data = { 
        phone: this.routerDataProv.getData(),
        password, 
        password_confirm 
      };
      this.loaderProv.showSend();
      this.http.put(this.configProv.apiUrl + "password", data).subscribe(
        data => {
          this.loaderProv.dismiss();
          this.alertProv.showAlert('Успех','Пароль изменен!');
          console.log('update', data);
          this.router.navigate(['log-in']);
        },
        err => {
          this.loaderProv.dismiss();
          this.errorProv.handleError(err);
        }
      );
    }
  }
  
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

  getInfo(index: number) {
    const head = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'token': localStorage.getItem('userToken')
    }
    this.loaderProv.showReq();
    this.http.get(this.configProv.apiUrl+"user?page="+index, {headers: head}).subscribe(
      (data: any) => this.routerDataProv.setUser(data.body),
      err => {
        this.loaderProv.dismiss();
        this.errorProv.handleError(err);
      }
    ); 
  }

  logout() {
    const data = { token: localStorage.getItem('userToken') };
    this.loaderProv.showSend();
    this.http.put(this.configProv.apiUrl + "logout", data).subscribe(
      data => {
        this.loaderProv.dismiss();
        console.log('logout', data);
        localStorage.removeItem('advFlag');
        localStorage.removeItem('userToken');
        localStorage.removeItem('userInfo');
        this.router.navigate(['log-in']);
      },
      err => {
        this.loaderProv.dismiss();
        this.errorProv.handleError(err);
      }
    );
  }
}
