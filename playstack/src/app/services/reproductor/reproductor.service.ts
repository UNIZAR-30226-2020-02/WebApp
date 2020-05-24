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

  constructor(tipo: string, esPrivada: boolean, nombre: string, covers: string[], tracks: Cancion[]) {
    this.tipo = tipo;
    this.esPrivada = esPrivada;
    this.nombre = nombre;
    this.covers = covers;
    this.tracks = tracks;
  }
}

export class Podcast {
  titulo: string;
  descripcion: string;
  idioma: string;
  foto: string;
  tema: string;
  interlocutores: string[];
  episodios: Episodio[];

  constructor (titulo: string, descripcion: string, idioma: string, foto: string, tema: string, interlocutores: string[], episodios: Episodio[]) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.idioma = idioma;
    this.foto = foto;
    this.tema = tema;
    this.interlocutores = interlocutores;
    this.episodios = episodios;
  }
}


@Injectable({
  providedIn: 'root'
})
export class ReproductorService {

  readonly ROOT_URL = 'https://playstack.azurewebsites.net';

  listaAudio: Audio[] = [];
  cola: Audio[] = [];

  activeAudio: Audio = null;
  player: Howl = null;
  isPlaying = false;

  progress = 0;
  duracion: Number = null;
  idAudio: Number = null;

  constructor() { }

  setListaAudio(playlist: Audio[]) {
    this.listaAudio = playlist;
  }

  getActiveAudio(): any {
    return this.activeAudio
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
    this.player.stop(this.idAudio);
    this.idAudio = null;
  }

  start(audio: Audio) {
    if (this.player) {
      this.player.stop();
    }

    this.player = new Howl({
      src: audio.path,
      html5: true,
      onplay: () => {
        console.log("onplay");
        this.activeAudio = audio;
        this.isPlaying = true;
        this.updateProgress();
      },
      onend: () => {
        console.log("onend");
        this.next();
      }
    });
    this.idAudio = this.player.play();
    console.log(this.idAudio);
  }

  getDuration(): number {
    try {
      return this.player.duration(this.idAudio);
    }
    catch (error) {
      return null;
    }
  }

  getProgress(): number {
    try {
      return this.player.seek(this.idAudio);
    }
    catch (error) {
      return null;
    }
  }

  mostrarTiempo(segundos: number): string {
    if (!segundos) {
      return '--:--'
    }
    else {
      let min = Math.floor(segundos % 3600 / 60) || 0;
      let seg = Math.floor(segundos % 3600 % 60) || 0;
      return ('0' + min).slice(-2) + ":" + ('0' + seg).slice(-2);
    }
  }


  togglePlayer() {
    console.log("Toogle player", this.idAudio);
    if (this.isPlaying) {
      this.player.pause(this.idAudio);
    }
    else {
      this.idAudio = this.player.play();
    }
    console.log("Toole, player", this.idAudio);
    this.isPlaying = !this.isPlaying;
  }

  next() {
    let index = this.listaAudio.indexOf(this.activeAudio);
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
    let index = this.listaAudio.indexOf(this.activeAudio);
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

  updateProgress() {
    let seek = this.player.seek(this.idAudio);
    this.progress = (seek / this.getDuration()) * 100 || 0;
    setTimeout(() => {
      this.updateProgress();
    }, 1000)
  }

}