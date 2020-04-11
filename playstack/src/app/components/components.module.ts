import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReprodutorComponent } from './reprodutor/reprodutor.component';

@NgModule({
  declarations: [ReprodutorComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [ReprodutorComponent]
})
export class ComponentsModule { }
