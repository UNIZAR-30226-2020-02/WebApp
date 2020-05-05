import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { SplitPanePage } from './split-pane.page';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

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
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'buscar',
        loadChildren: () => import('../buscar/buscar.module').then(m => m.BuscarPageModule),
        canActivate: [AuthGuardService]
      },
      {
        path: 'biblioteca',
        loadChildren: () => import('../biblioteca/biblioteca.module').then(m => m.BibliotecaPageModule),
        canActivate: [AuthGuardService]
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
