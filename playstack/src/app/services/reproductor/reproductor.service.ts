import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pairs } from 'rxjs';
import { KeyValuePipe, KeyValue } from '@angular/common';
import { stringify } from 'querystring';
import { NumericValueAccessor } from '@ionic/angular';
import { AuthenticationService } from '../authentication/authentication.service';

export interface Track {
  nombre: string;
  artistas: string[];
  albumes: string[];
  covers: string[];
  path: string;
  esFavorita: boolean;
}

/*
 * tipo puede ser:
 *  Genero
 *  Album
 *  Artista
 *  Playlist
 */
export interface Playlist {
  tipo: string;
  esPrivada: boolean;
  nombre: string;
  cover: string;
  tracks: Track[];
}

export interface ColaReproduccion {
  tracks: Track[];
}

export interface Genero {
  nombre: string;
  cover: string;
}


@Injectable({
  providedIn: 'root'
})
export class ReproductorService {

  readonly ROOT_URL = 'https://playstack.azurewebsites.net';

  playlist: Track[] = [];
  cola: Track[] = [];

  activeTrack: Track = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;
  duracion: Number;
  idCancion: Number;

  constructor(private http: HttpClient, private auth : AuthenticationService) { }

  getDuration(): number
  {
    return this.player.duration();
  }

  addToPlaylist(track: Track[]) {
  }

  setPlaylist(playlist: Track[]) {
    this.playlist = playlist;
  }

  addToPlaylistObservable(cancionesObservable: Observable<any>) {
    let playlist: Track[] = [];
    cancionesObservable.subscribe(mapCanciones => {

      for (let cancion in mapCanciones) {
        let track: Track = this.constructTrack2(cancion, mapCanciones[cancion]);
        playlist.push(track);
      }
    })
    this.playlist = playlist;
  }

  start(track: Track) {
    if (this.player) {
      this.player.stop();
    }
    this.activeTrack = track;
    this.player = new Howl({
      src: track.path,
      html5: true,
      onplay: () => {
        console.log("callback de play");
        this.isPlaying = true;
        this.updateProgress(this.activeTrack);
        this.duracion = this.player.duration();
      },
      onend: () => {
      }
    });
    console.log("Play: poniendo en marcha " + this.activeTrack.nombre);
    this.player.play();    
  }

  togglePlayer() {
    if (this.isPlaying) {
      this.player.pause();
    }
    else {
      this.player.play();   
    }
    this.isPlaying = !this.isPlaying;
  }

  next() {
    let index = this.playlist.indexOf(this.activeTrack);
    if (index != this.playlist.length - 1) {
      console.log("Poniendo canción " + (index + 1));
      console.log("Se titula: " + this.playlist[index + 1].nombre);
      this.start(this.playlist[index + 1]);
    }
    else {
      console.log("Poniendo canción 0");
      console.log("Se titula: " + this.playlist[0].nombre);
      this.start(this.playlist[0]);
    }
  }

  prev() {
    let index = this.playlist.indexOf(this.activeTrack);
    if (index > 0) {
      console.log("Poniendo canción " + (index - 1));
      console.log("Se titula: " + this.playlist[index - 1].nombre);
      this.start(this.playlist[index - 1]);
    }
    else {
      console.log("Poniendo canciónN " + (this.playlist.length - 1));
      console.log("Se titula: " + this.playlist[this.playlist.length - 1].nombre);
      this.start(this.playlist[this.playlist.length - 1]);
    }
  }

  updateProgress(track: Track) {
    this.duracion = this.player.duration();
    //console.log("DURACION: "+this.duracion);
    let seek = this.player.seek();
    //console.log("SEEK: "+seek);
    this.progress = (seek / this.player.duration()) * 100 || 0;
    //console.log("PROGRESS: "+ this.progress);
    if (track === this.activeTrack) { setTimeout(() => { this.updateProgress(track); }, 1000) }
  }





  /* Búsqueda y construcción de listas de reproducción */

  generos: Playlist[] = [{ tipo: "Genero", esPrivada: false, nombre: "Rap", cover: "assets/albumes/RapGenre.png", tracks: [] },
  { tipo: "Genero", esPrivada: false, nombre: "Techno", cover: "assets/albumes/TechnoGenre.png", tracks: [] },
  { tipo: "Genero", esPrivada: false, nombre: "Latin", cover: "assets/albumes/LatinGenre.png", tracks: [] },
  { tipo: "Genero", esPrivada: false, nombre: "Pop", cover: "assets/albumes/PopGenre.png", tracks: [] }];
  getGeneros() {
    return this.generos;
  }

  artistas: Playlist[] = [{ tipo: "Artista", esPrivada: false, nombre: "Macklemore", cover: "assets/artistas/macklemore.jpg", tracks: [] },
  { tipo: "Artista", esPrivada: false, nombre: "Eminem", cover: "assets/artistas/eminem.jpg", tracks: [] },
  { tipo: "Artista", esPrivada: false, nombre: "Da tweekaz", cover: "assets/artistas/datweekaz.jpg", tracks: [] },
  { tipo: "Artista", esPrivada: false, nombre: "Timmy trumpet", cover: "assets/artistas/timmytrumpet.jpg", tracks: [] }];
  getArtistas() {
    return this.artistas;
  }

  constructTrack(cancion: any) {
    let track = {
      nombre: cancion.key,
      artistas: cancion.value.Artistas,
      albumes: cancion.value.Albumes,
      covers: cancion.value.ImagenesAlbum,
      path: cancion.value.url,
      esFavorita: cancion.value.EsFavorita
    };
    console.log("ConstructTrack nombre: " + track.nombre);
    return track;
  }

  constructTrack2(key: string, value: any) {
    let track = {
      nombre: key,
      artistas: value.Artistas,
      albumes: value.Albumes,
      covers: value.ImagenesAlbum,
      path: value.url,
      esFavorita: value.EsFavorita
    };
    return track;
  }

  // TODO: usuario
  getCancionesByGenero(genero: string) {
    let user = this.auth.getUserName();
    let params = new HttpParams().append('NombreGenero', genero).append('Usuario', user);
    //return this.http.get('https://playstack.azurewebsites.net/get/song/bygenre?NombreGenero=' + genero + '&Usuario=pepo');
    return this.http.get(this.ROOT_URL + '/get/song/bygenre', { params });
  }

  getCancionesByArtista(artista: string) {
    let params = new HttpParams().set('NombreArtista', artista);    //TODO esto no sería append?
    // const request: string = 'https://playstack.azurewebsites.net/get/artist/albums?NombreArtista=' + artista
    return this.http.get(this.ROOT_URL + '/get/artist/albums', { params });
  }

  // TODO arreglar todo esto
  recuperarTracks(playlist: Playlist): any {
    // Dependiendo del tipo de la playlist, realizar una consulta u otra para recuperar sus canciones de la BD
    let canciones: Observable<any>;
    let tracks: Track[] = [];

    switch (playlist.tipo) {
      case "Genero": {
        canciones = this.getCancionesByGenero(playlist.nombre);
        break;
      }
      case "Artista": {
        canciones = this.getCancionesByArtista(playlist.nombre);
        break;
      }
      case "Album": {
        // TODO
      }
      case "Playlist": {
        // TODO
      }
    }

    return canciones;

  }
}
