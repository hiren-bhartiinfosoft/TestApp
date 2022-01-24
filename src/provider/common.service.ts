import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public loader: any = null;
  public loadingMessage: string = 'Please wait...';

  constructor(  private loadingCtrl: LoadingController,) { }
// show loader
  async showLoader() {
    this.loader = await this.loadingCtrl.create({
          message: 'Please wait...',
    });
    this.loader.present(); 
  }
// hide loader
  hideLoader() {
    if (this.loader) {
      this.loader.dismiss();
      this.loader = null
    }
  }
}
