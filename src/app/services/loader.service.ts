import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading: boolean = false;
  constructor(private loaderCtrl: LoadingController) { }

  async showSend(){
    if(!this.isLoading){
      this.isLoading = true;
      return await this.loaderCtrl.create({
        message: 'Отправка данных',
        duration: 30000
      }).then(e =>{
        e.present().then(() => {
          if (!this.isLoading) {
            e.dismiss();
          }
        });
      });
    }
  }
  async showReq(){
    if(!this.isLoading){
      this.isLoading = true;
      return await this.loaderCtrl.create({
        message: 'Получение данных',
        duration: 30000
      }).then(e =>{
        e.present().then(() => {
          if (!this.isLoading) {
            e.dismiss();
          }
        });
      });
    }
  }
  async dismiss() {
    this.isLoading = false;
    return await this.loaderCtrl.dismiss();
  }
}
