import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// for network check
import { Network } from '@ionic-native/network/ngx'
import { NetworkService } from './../provider/network.service';
// for alert dialog show
import { AlertService } from './../provider/alert.service';
// common utils, like progress bar and etc...
import { CommonService } from './../provider/common.service';

// for web api call
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { HTTP } from '@ionic-native/http/ngx'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [Network,
    NetworkService,
    AlertService,
    CommonService,
    HTTP,
    HttpClientModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}