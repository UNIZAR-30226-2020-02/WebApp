import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColaReproduccionPageRoutingModule } from './cola-reproduccion-routing.module';

import { ColaReproduccionPage } from './cola-reproduccion.page';

import { ComponentsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColaReproduccionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ColaReproduccionPage]
})
export class ColaReproduccionPageModule {}