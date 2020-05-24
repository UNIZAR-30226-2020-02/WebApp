import { ContenidoService } from 'src/app/services/contenido/contenido.service';
import { Playlist } from './../../services/reproductor/reproductor.service';
import { Component, OnInit, Input } from '@angular/core';
import { ReproductorService } from '../../services/reproductor/reproductor.service';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-scrollhorizontal',
  templateUrl: './scrollhorizontal.component.html',
  styleUrls: ['./scrollhorizontal.component.scss'],
})
export class ScrollhorizontalComponent implements OnInit {

  @Input()
  listaConjuntos: Observable<any>;
  @Input()
  tipoConjuntos: string;

  conjuntos: any;

  slideOpts = {
    slidesPerView: 4,
    freeMode: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }

  constructor(public rs: ReproductorService, private router: Router, private activatedRoute: ActivatedRoute, private cs: ContenidoService) { }

  ngOnInit() {
    console.log(this.listaConjuntos);
    this.listaConjuntos.subscribe(
      resultado => {console.log(resultado); this.conjuntos=resultado}
    )
  }

  openConjunto(conjunto: any) {
    console.log(conjunto);
    switch (this.tipoConjuntos) {
      case 'Generos': {
        console.log('Abrir género');
        let navigationExtras: NavigationExtras = {
          relativeTo: this.activatedRoute,
          state: {
            playlist: this.cs.constructPlaylist('Genero', false, conjunto.key, [conjunto.value], [])
          }
        };
        console.log(this.activatedRoute);
        this.router.navigate(['../../playlist'], navigationExtras);
        break;
      }
      case 'Artistas': {
        console.log('Abrir artista', conjunto.key, conjunto.value);
        let navigationExtras: NavigationExtras = {
          relativeTo: this.activatedRoute,
          state: {
            nombreArtista: conjunto.key,
            image: conjunto.value
          }
        };
        console.log(this.activatedRoute);
        this.router.navigate(['../../artista'], navigationExtras);
        break;
      }
      case 'Podcasts': {
        console.log('Abrir podcast');
        let navigationExtras: NavigationExtras = {
          relativeTo: this.activatedRoute,
          state: {
            podcast: conjunto
          }
        };
        console.log(this.activatedRoute);
        this.router.navigate(['../../podcast'], navigationExtras);
        break;
      }
    }
  }
}
