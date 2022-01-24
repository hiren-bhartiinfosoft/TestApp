import { Component, OnInit } from '@angular/core';

import { NetworkService } from '../../provider/network.service';
import { AlertService } from '../../provider/alert.service';
import { Platform} from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonService } from '../../provider/common.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    public commonService:CommonService,
    public route: ActivatedRoute,
    public router: Router
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

    // call web api and get the   list of data
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

    // open edit popup screen
    editProductItem(data){
      
      this.router.navigate(['/edit-product'], { queryParams: {itemId:data.id, itemName: data.title } });
    }

// call delete product api and remove item from the list
    deleteProductItem(data){
      var url ="https://fakestoreapi.com/products/"+data.id;
     
      var deleteIndex;
    for(let i = 0; i < this.productList.length; i++){
      if(this.productList[i].id == data.id){
        deleteIndex=i;
        break
      }
    } 
      this.commonService.showLoader().then(s => {
        this.http.delete(url,this.httpOptions).subscribe((response) => {
          this.commonService.hideLoader();
       if(this.productList){
        this.productList.splice(deleteIndex, 1);
       }
       this.alertService.presentAlert("","Record Delete Successfully");
        }, error => {
          this.commonService.hideLoader();
          this.alertService.presentErrorAlert(error.toString())
        });
      });
    }
}
