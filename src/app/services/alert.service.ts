import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  async showAlert(title, message){
    const alert = await this.alertController.create({
      header: title,
      subHeader: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
