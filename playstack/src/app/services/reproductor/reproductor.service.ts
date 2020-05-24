import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { map } from 'rxjs/operators';

export class Audio {
  nombre: string;
  path: string;

  constructor(nombre: string, path: string) {
    this.nombre = nombre;
    this.path = path;
  }
}

export class Cancion extends Audio {
  covers: string[];
  artistas: string[];
  albumes: string[];
  esFavorita: boolean;

  constructor(nombre: string, path: string, covers: string[], artistas: string[], albumes: string[], esFavorita: boolean) {
    super(nombre, path);
    this.covers = covers;
    this.artistas = artistas;
    this.albumes = albumes;
    this.esFavorita = esFavorita;
  }
}

export class Episodio extends Audio {
  numCap: number;
  fecha: Date;

  constructor(nombre: string, path: string, numCap: number, fecha: Date) {
    super(nombre, path);
    this.numCap = numCap;
    this.fecha = fecha;
  }
}

/*
 * tipo puede ser:
 *  Genero
 *  Album
 *  Artista
 *  Playlist
 */
export class Playlist {
  tipo: string;
  esPrivada: boolean;
  nombre: string;
  covers: string[];
  tracks: Cancion[];
}

export class Podcast {
  foto: string;
  tema: string;
  episodios: Episodio[];
}


@Injectable({
  providedIn: 'root'
})
export class ReproductorService {

  readonly ROOT_URL = 'https://playstack.azurewebsites.net';

  listaAudio: Audio[] = [];
  cola: Audio[] = [];

  activeTrack: Audio = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;
  duracion: Number;
  idCancion: Number;

  constructor() { }

  getDuration(): number {
    return this.player.duration();
  }

  getActiveTrack(): any {
    this.activeTrack
  }

  setListaAudio(playlist: Audio[]) {
    this.listaAudio = playlist;
  }

  // Devuelve:
  //  Cancion
  //  Episodio
  tipoAudio(audio: Audio): string {
    if (audio instanceof Cancion) {
      return "Cancion";
    }
    else if (audio instanceof Episodio) {
      return "Episodio";
    }
    else if (audio instanceof Audio) {
      return "Audio";
    }
    else {
      return "Desconocido";
    }
  }

  /* Control de reproduccion */

  stop() {
    this.player.stop();
    delete this.player;
  }

  start(track: Audio) {
    if (this.player) {
      this.player.stop();
      delete this.player;
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
        this.next();
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
    let index = this.listaAudio.indexOf(this.activeTrack);
    if (index != this.listaAudio.length - 1) {
      console.log("Poniendo canción " + (index + 1));
      console.log("Se titula: " + this.listaAudio[index + 1].nombre);
      this.start(this.listaAudio[index + 1]);
    }
    else {
      console.log("Poniendo canción 0");
      console.log("Se titula: " + this.listaAudio[0].nombre);
      this.start(this.listaAudio[0]);
    }
  }

  prev() {
    let index = this.listaAudio.indexOf(this.activeTrack);
    if (index > 0) {
      console.log("Poniendo canción " + (index - 1));
      console.log("Se titula: " + this.listaAudio[index - 1].nombre);
      this.start(this.listaAudio[index - 1]);
    }
    else {
      console.log("Poniendo canción " + (this.listaAudio.length - 1));
      console.log("Se titula: " + this.listaAudio[this.listaAudio.length - 1].nombre);
      this.start(this.listaAudio[this.listaAudio.length - 1]);
    }
  }

  updateProgress(track: Audio) {
    this.duracion = this.player.duration();
    //console.log("DURACION: "+this.duracion);
    let seek = this.player.seek();
    //console.log("SEEK: "+seek);
    this.progress = (seek / this.player.duration()) * 100 || 0;
    //console.log("PROGRESS: "+ this.progress);
    if (track === this.activeTrack) { setTimeout(() => { this.updateProgress(track); }, 1000) }
  }
}