import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArrangeComponentPageRoutingModule } from './arrange-component-routing.module';

import { ArrangeComponentPage } from './arrange-component.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArrangeComponentPageRoutingModule
  ],
  declarations: [ArrangeComponentPage]
})
export class ArrangeComponentPageModule {}
