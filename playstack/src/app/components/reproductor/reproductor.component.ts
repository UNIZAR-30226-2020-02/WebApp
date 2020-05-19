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


  constructor(public rs: ReproductorService) { }
  
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
  }

  ngOnInit() {}

}
