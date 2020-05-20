<<<<<<< HEAD
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ColaReproduccionPageRoutingModule } from './../../pages/cola-reproduccion/cola-reproduccion-routing.module';
import { ColaReproduccionPage } from './../../pages/cola-reproduccion/cola-reproduccion.page';
=======
>>>>>>> aab93a2c4076c33ddad9709ba003db0a4ba7c848
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


<<<<<<< HEAD
  constructor(public rs: ReproductorService, public router: Router, private activatedRoute: ActivatedRoute) { }
=======
  constructor(public rs: ReproductorService) { }
>>>>>>> aab93a2c4076c33ddad9709ba003db0a4ba7c848
  
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
<<<<<<< HEAD
    // Abrir pantalla de visualización de playlist pasando a la página el objeto que contiene la playlist
    
    let navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute
    };
    console.log(this.activatedRoute);
    this.router.navigate(['../../cola-reproduccion']), navigationExtras;
=======
>>>>>>> aab93a2c4076c33ddad9709ba003db0a4ba7c848
  }
  ngOnInit() {}

}
