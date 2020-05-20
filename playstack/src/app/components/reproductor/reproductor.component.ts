import { SplitPanePageModule } from './../../pages/split-pane/split-pane.module';
import { SplitPanePage } from './../../pages/split-pane/split-pane.page';
import { SplitPanePageRouterModule } from './../../pages/split-pane/split-pane.routing';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ColaReproduccionPageRoutingModule } from './../../pages/cola-reproduccion/cola-reproduccion-routing.module';
import { ColaReproduccionPage } from './../../pages/cola-reproduccion/cola-reproduccion.page';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReproductorService } from '../../services/reproductor/reproductor.service';

import { IonRange } from '@ionic/angular';



@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.scss'],
})
export class ReproductorComponent implements OnInit {
  @ViewChild('range', {static: false}) range: IonRange;


  constructor(public rs: ReproductorService, public router: Router, private activatedRoute: ActivatedRoute, private sp: SplitPanePage) { }
  
  seek()
  {
    let newValue = +this.range.value;
    let duration : number = this.rs.getDuration();
    console.log(duration * (newValue / 100));
    this.rs.player.pause();
    setTimeout(() => { this.rs.player.seek(duration * (newValue / 100)); }, 20)
    setTimeout(() => { this.rs.player.play(); }, 50);
  }

  abrirColaReproduccion() {
    console.log("Abrir cola");
    
    this.sp.open('/app/cola-reproduccion');
  }
  ngOnInit() {}
}
