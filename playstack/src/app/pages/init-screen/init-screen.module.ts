import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InitScreenPageRoutingModule } from './init-screen-routing.module';

import { InitScreenPage } from './init-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InitScreenPageRoutingModule
  ],
  declarations: [InitScreenPage]
})
export class InitScreenPageModule {}
