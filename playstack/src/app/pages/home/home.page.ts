import { Podcast } from 'src/app/services/reproductor/reproductor.service';
import { Playlist } from './../../services/reproductor/reproductor.service';
import { Component, OnInit } from '@angular/core';
import { ReproductorService } from '../../services/reproductor/reproductor.service';
import { Observable } from 'rxjs';
import { ContenidoService } from 'src/app/services/contenido/contenido.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  
  generos: Observable<any>;
  artistas: Observable<any>;
  podcasts: Observable<any>;

  showSpinner1: boolean = true;
  showSpinner2: boolean = true;
  showSpinner3: boolean = true;

  constructor(public rs: ReproductorService, public cs: ContenidoService) {
  }

  ngOnInit() {

    this.generos = this.cs.getTodosGeneros();
    this.generos.subscribe(() => this.showSpinner1 = false);
    this.artistas = this.cs.getTodosArtistas();
    this.artistas.subscribe(() => this.showSpinner2 = false);
    this.podcasts = this.cs.getTodosPodcasts();
    this.podcasts.subscribe(() => this.showSpinner3 = false);
  }

}
