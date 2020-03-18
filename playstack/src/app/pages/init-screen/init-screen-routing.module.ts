import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitScreenPage } from './init-screen.page';

const routes: Routes = [
  {
    path: '',
    component: InitScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitScreenPageRoutingModule {}
