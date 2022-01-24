import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArrangeComponentPage } from './arrange-component.page';

const routes: Routes = [
  {
    path: '',
    component: ArrangeComponentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArrangeComponentPageRoutingModule {}
