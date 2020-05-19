import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ReproductorService, Playlist } from 'src/app/services/reproductor/reproductor.service';


@Component({
  selector: 'app-cola-reproduccion',
  templateUrl: './cola-reproduccion.page.html',
  styleUrls: ['./cola-reproduccion.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ColaReproduccionPage implements OnInit {

  constructor(public rs: ReproductorService) { }

  ngOnInit() {
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
    let indiceActual: number = this.rs.playlist.indexOf(this.rs.activeTrack);
    let nextSongs = this.rs.playlist.slice(indiceActual + 1);
    console.log("Reproduciendo cancion", indiceActual);
    return nextSongs;
  }
  
}
