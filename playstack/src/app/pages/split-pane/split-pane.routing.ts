import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { SplitPanePage } from './split-pane.page';

const routes: Routes = [
  {
    path: 'split-pane',
    component: SplitPanePage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'buscar',
        children: [
          {
            path: '',
            loadChildren: () => import('../buscar/buscar.module').then(m => m.BuscarPageModule)
          }
        ]
      },
      {
        path: 'para-ti',
        children: [
          {
            path: '',
            loadChildren: () => import('../para-ti/para-ti.module').then(m => m.ParaTiPageModule)
          }
        ]
      },
      {
        path: 'biblioteca',
        children: [
          {
            path: '',
            loadChildren: () => import('../biblioteca/biblioteca.module').then(m => m.BibliotecaPageModule)
          }
        ]
      },
      {
        path: 'premium',
        children: [
          {
            path: '',
            loadChildren: () => import('../premium/premium.module').then(m => m.PremiumPageModule)
          }
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: 'split-pane/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class SplitPanePageRouterModule { }
