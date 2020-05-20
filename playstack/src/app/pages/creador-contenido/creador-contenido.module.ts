import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreadorContenidoPageRoutingModule } from './creador-contenido-routing.module';

import { CreadorContenidoPage } from './creador-contenido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreadorContenidoPageRoutingModule
  ],
  declarations: [CreadorContenidoPage]
})
export class CreadorContenidoPageModule {}
