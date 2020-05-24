import { Component, OnInit } from '@angular/core';
import { ReproductorService } from 'src/app/services/reproductor/reproductor.service';
import { ContenidoService } from 'src/app/services/contenido/contenido.service';

@Component({
  selector: 'app-creador-contenido',
  templateUrl: './creador-contenido.page.html',
  styleUrls: ['./creador-contenido.page.scss'],
})
export class CreadorContenidoPage implements OnInit {
  currentTab: string;
  constructor(public rs: ReproductorService, public cs : ContenidoService) { }

  ngOnInit() {
    this.currentTab = "Musica";
  }
  setPodcasts() {
    this.currentTab = "Podcasts";
  }
  setMusic() {
    this.currentTab = "Musica";
  }
}
