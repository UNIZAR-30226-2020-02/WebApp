import { Playlist } from './../../services/reproductor/reproductor.service';
import { Component, OnInit, Input } from '@angular/core';
import { ReproductorService } from '../../services/reproductor/reproductor.service';
import { Observable } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-scrollhorizontal',
  templateUrl: './scrollhorizontal.component.html',
  styleUrls: ['./scrollhorizontal.component.scss'],
})
export class ScrollhorizontalComponent implements OnInit {

  @Input()
  listaPlaylists: Playlist[];

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

  constructor(public rs: ReproductorService, private router: Router) { }

  ngOnInit() {
  }

  openPlaylist(playlist: Playlist) {
    console.log("Abrir playlist: ", playlist.tipo, playlist.esPrivada, playlist.nombre);

    // Abrir pantalla de visualización de playlist pasando a la página el objeto que contiene la playlist
    let navigationExtras: NavigationExtras = {
      state: {
        playlist: playlist
      }
    };
    this.router.navigate(['playlist'], navigationExtras);
  }
}
