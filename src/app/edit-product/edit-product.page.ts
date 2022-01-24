import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NetworkService } from '../../provider/network.service';
import { AlertService } from '../../provider/alert.service';
import { Platform} from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonService } from '../../provider/common.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {

   //variable declaration
  public itemId:any;
  public itemName: any = '';
  public isConnected=false;
  public productFormGroup: FormGroup;

  // header option of the api call
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': '*'
    })
  }

  // constructor of the class
  constructor(private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    public networkService :NetworkService,
    public alertService:AlertService,
    public http: HttpClient,
    public commonService:CommonService,) { 

    }

    
  // over-ride ngOnInit method of page life cycle - get param data from route
  ngOnInit() {
    this.productFormGroup = this.formBuilder.group({
      itemName: ['', [Validators.required, Validators.minLength(2)]],
   })
   this.route
    .queryParams
    .subscribe(params => {
      this.itemId = params['itemId'];
      this.itemName=params['itemName'];
    });
    this.networkSubscriber();
  }

  
  // for internet subscriber (check the internet is available or not)
  networkSubscriber(): void {
    this.networkService
        .getNetworkStatus()
        .subscribe((connected: boolean) => {
            this.isConnected = connected;
        });
  }

  // input text change listener to set data in variable
  changeListener(text){
    this.itemName =text;
  }

   // call update record web api put type with body param 
   updateProductCall(){
     if(this.itemName){
      const body = { title: this.itemName };
      this.commonService.showLoader().then(s => {
        this.http.put("https://fakestoreapi.com/products/"+this.itemId, body,this.httpOptions).subscribe((response) => {
          this.commonService.hideLoader();
          this.alertService.presentAlert("","Record Update Successfully");
        }, error => {
          this.commonService.hideLoader();
          this.alertService.presentErrorAlert(error.toString())
        });
      });
     }else{
      this.alertService.presentErrorAlert("Please Enter Product Title")
     }
  }

}
