import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { SplitPanePage } from './split-pane.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: SplitPanePage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'buscar',
        loadChildren: () => import('../buscar/buscar.module').then(m => m.BuscarPageModule)
      },
      {
        path: 'para-ti',
        loadChildren: () => import('../para-ti/para-ti.module').then(m => m.ParaTiPageModule)
      },
      {
        path: 'biblioteca',
        loadChildren: () => import('../biblioteca/biblioteca.module').then(m => m.BibliotecaPageModule)
      },
      {
        path: 'premium',
        loadChildren: () => import('../premium/premium.module').then(m => m.PremiumPageModule)
      },
    ]
  }  
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class SplitPanePageRouterModule { }
