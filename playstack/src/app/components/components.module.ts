import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReproductorComponent } from './reproductor/reproductor.component';

@NgModule({
  declarations: [ReproductorComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [ReproductorComponent]
})
export class ComponentsModule { }
