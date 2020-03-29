import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitScreenPage } from './init-screen.page';

const routes: Routes = [
  {
    path: '',
    component: InitScreenPage,
    children: [
      {
        path: 'login',
        children: [
          {
            path: '',
            loadChildren: () => import('../login/login.module').then(m => m.LoginPageModule)
          }
        ]
      },
      {
        path: 'register',
        children: [
          {
            path: '',
            loadChildren: () => import('../register/register.module').then(m => m.RegisterPageModule)
          }
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: 'init-screen',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InitScreenPageRoutingModule {}
