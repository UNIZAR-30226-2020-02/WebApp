import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'init-screen',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'register',
    loadChildren: './pages/register/register.module#RegisterPageModule'
  },
  {
    path: 'init-screen',
    loadChildren: './pages/init-screen/init-screen.module#InitScreenPageModule'
  },
  {
    path:'app',
    loadChildren: './pages/split-pane/split-pane.module#SplitPanePageModule',
    // canActivate: [AuthGuardService]
  },
  {
    path: 'playlist',
    loadChildren: () => import('./pages/playlist/playlist.module').then( m => m.PlaylistPageModule),
    // canActivate: [AuthGuardService]
  },
  {
    path: 'configuration',
    loadChildren: () => import('./pages/configuration/configuration.module').then( m => m.ConfigurationPageModule)
  },  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
