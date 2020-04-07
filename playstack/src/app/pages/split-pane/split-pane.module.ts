import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplitPanePageRouterModule } from './split-pane.routing';

import { SplitPanePage } from './split-pane.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplitPanePageRouterModule
  ],
  declarations: [SplitPanePage]
})
export class SplitPanePageModule {}
