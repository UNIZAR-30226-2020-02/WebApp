import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ReproductorService, Playlist, Cancion } from 'src/app/services/reproductor/reproductor.service';
import { rmdirSync } from 'fs';


@Component({
  selector: 'app-cola-reproduccion',
  templateUrl: './cola-reproduccion.page.html',
  styleUrls: ['./cola-reproduccion.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ColaReproduccionPage implements OnInit {

  constructor(public rs: ReproductorService) { }

  ngOnInit() {
    console.log("Cola de reproduccion abierta");
  }

  ionViewWillEnter() {
    console.log("Cola de reproduccion abierta");
    console.log("lista audios", this.rs.listaAudio);
    console.log(this.rs.tipoAudio(this.rs.activeTrack));
    console.log(this.rs.tipoAudio(this.rs.listaAudio[0]));
    console.log((<Cancion>this.rs.activeTrack).artistas);
  }

  getActiveTrack() {
    if (this.rs.tipoAudio(this.rs.activeTrack) == "Cancion") {
      let cancion = <Cancion>this.rs.activeTrack;
      return `<h1>${cancion.nombre}<h1><h2>${cancion.artistas}<h2>`
    }
  }

  buttonAction() {
    console.log("boton activado");
  }
  // Reproduce la canción que ha pedido el usuario y
  // la elimina de la cola
  playSongCola(indice: number) {
    this.rs.start(this.rs.cola[indice]);
    this.rs.cola.splice(indice, 1);
  }

  // Reproduce la canción que ha pedido el usuario y
  // avanza la playlist hasta ese punto
  playSongPlaylist(indice: number) {
    this.rs.start(this.getNextPlaylistSongs()[indice]);
  }

  getNextPlaylistSongs() {
    let indiceActual: number = this.rs.listaAudio.indexOf(this.rs.activeTrack);
    let nextSongs = this.rs.listaAudio.slice(indiceActual + 1);
    console.log("Reproduciendo cancion", indiceActual);
    return nextSongs;
  }
  
}
