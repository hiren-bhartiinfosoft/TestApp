import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alertOfService: any;
  private isAlertPresent:boolean = false;
  constructor(public alertCtrl: AlertController, public plt: Platform) { }

  // show alert dialog with dynamic title and message
  async presentAlert(title: string, message: string) {
    var alertBox: any;
    if (this.plt.is('ios')) {
      alertBox = '';
    } else {
      alertBox = 'alertbox';
    }
    var self = this
    if(!self.isAlertPresent) {
      self.isAlertPresent = true;
    this.alertOfService = await  this.alertCtrl.create(
      {
        header:  title,
        cssClass: alertBox,
        message: message,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              self.isAlertPresent = false
            }
          }
        ]
      });
    }
    return await  this.alertOfService.present();
   
  }
  // show alert dialog with alert with dynamic message
  presentErrorAlert(message: string) {
    return this.presentAlert('Alert', message);
  }

}
