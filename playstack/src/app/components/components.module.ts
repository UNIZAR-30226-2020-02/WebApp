import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReproductorComponent } from './reproductor/reproductor.component';
import { ScrollhorizontalComponent} from './scrollhorizontal/scrollhorizontal.component';
import { ModalPageModule } from '../pages/crear/modal/modal.module';

@NgModule({
  declarations: [ReproductorComponent,ScrollhorizontalComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ModalPageModule
  ],
  exports: [ReproductorComponent,ScrollhorizontalComponent]
})
export class ComponentsModule { }
