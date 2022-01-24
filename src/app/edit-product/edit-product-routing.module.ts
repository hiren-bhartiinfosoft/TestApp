import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProductPage } from './edit-product.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: '',
    component: EditProductPage
  }
];

@NgModule({
  imports: [   FormsModule,
    ReactiveFormsModule  ,RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProductPageRoutingModule {}
