import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { SplitPanePage } from './split-pane.page';
import { AuthGuardService } from 'src/app/services/auth-guard/auth-guard.service';

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
      {
        path: 'configuration',
        loadChildren: () => import('../configuration/configuration.module').then(m => m.ConfigurationPageModule)
      },
      {
        path: 'playlist',
        loadChildren: () => import('../playlist/playlist.module').then(m => m.PlaylistPageModule)
      },
      {
        path: 'cola-reproduccion',
        loadChildren: () => import('../cola-reproduccion/cola-reproduccion.module').then( m => m.ColaReproduccionPageModule)
      },
      {
        path: 'creador-contenido',
        loadChildren: () => import('../creador-contenido/creador-contenido.module').then( m => m.CreadorContenidoPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'social',
        loadChildren: () => import('../social/social.module').then( m => m.SocialPageModule)
      }
    ]
  }  
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class SplitPanePageRouterModule { }
