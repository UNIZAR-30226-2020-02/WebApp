import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColaReproduccionPage } from './cola-reproduccion.page';

const routes: Routes = [
  {
    path: '',
    component: ColaReproduccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColaReproduccionPageRoutingModule {}
