import { Cancion, Episodio } from './../../services/reproductor/reproductor.service';
import { SplitPanePage } from './../../pages/split-pane/split-pane.page';
import { Router, ActivatedRoute } from '@angular/router';
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


  constructor(public rs: ReproductorService, public router: Router, private sp: SplitPanePage) { }
  
  seek() {
    console.log("Reproducctor seek: ", this.range.value);
    console.log("Reproducctor seek: ", +this.range.value);
    let newValue = +this.range.value;
    let duration: number = this.rs.getDuration();
    console.log("seek: ", duration * (newValue / 100));
    this.rs.player.seek(duration * (newValue / 100), this.rs.idAudio);
  }

  abrirColaReproduccion() {
    console.log("Abrir cola");
    
    this.sp.open('/app/cola-reproduccion');
  }
  ngOnInit() {}
}
