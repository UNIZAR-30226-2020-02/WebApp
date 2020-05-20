import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreadorContenidoPage } from './creador-contenido.page';

const routes: Routes = [
  {
    path: '',
    component: CreadorContenidoPage,
    children: [
      {
        path: 'cancion',
        loadChildren: () => import('../crear/cancion/cancion.module').then( m => m.CancionPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreadorContenidoPageRoutingModule {}
