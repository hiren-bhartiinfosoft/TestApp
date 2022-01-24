import { Component, OnInit } from '@angular/core';

import { NetworkService } from '../../provider/network.service';
import { AlertService } from '../../provider/alert.service';
import { Platform} from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonService } from '../../provider/common.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  isConnected=false;
  productList:any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': '*'
    })
  }

  constructor(public networkService :NetworkService,
    public alertService:AlertService,
    public http: HttpClient,
    public commonService:CommonService
    ) { }

  ngOnInit() {
    this.networkSubscriber();
    this.doCheckInternet();
  }

  // for internet subscriber (check the internet is available or not)
  networkSubscriber(): void {
    this.networkService
        .getNetworkStatus()
        .subscribe((connected: boolean) => {
            this.isConnected = connected;
        });
      }
  
      async doCheckInternet(){
      if(this.isConnected){
        this.getProductListCall();
      }else{
        this.alertService.presentAlert(null,"Please check your internet")
      }
    }

    // call web api and get the list of data
    getProductListCall(){
      this.commonService.showLoader().then(s => {
        this.http.get("https://fakestoreapi.com/products",this.httpOptions).subscribe((response) => {
          this.commonService.hideLoader();
          this.productList=response;
        }, error => {
          this.commonService.hideLoader();
          this.alertService.presentErrorAlert(error.toString())
        });
      });
    }
}
