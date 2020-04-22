import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Track {
  nombre : string;
  artistas : string[];
  albumes : string[];
  covers: string[];
  path : string;
  esFavorita : boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ReproductorService {

  playlist: Track[];
  cola: Track[];
  
  activeTrack: Track = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;


  puntoActual: Number;
  duracion: Number;
  
  constructor(private http: HttpClient) { }

  
  constructTrack(cancion: any) {

    console.log("constructor");
    console.log(cancion);

    let track = {
      nombre: cancion.key,
      artistas: cancion.value.Artistas,
      albumes: cancion.value.Albumes,
      covers: cancion.value.ImagenesAlbum,
      path: cancion.value.url,
      esFavorita: cancion.value.EsFavorita
    };

    console.log(track);

    return track;
  }

  constructTrack2(key: string, value: any) {

    console.log("constructor");

    let track = {
      nombre: key,
      artistas: value.Artistas,
      albumes: value.Albumes,
      covers: value.ImagenesAlbum,
      path: value.url,
      esFavorita: value.EsFavorita
    };

    console.log(track);

    return track;
  }

  constructPlaylist(observableCanciones: Observable<any>) {
    let playlist: Track[];

    console.log("lista canciones");

    observableCanciones.subscribe(mapCanciones => {
      for (let cancion in mapCanciones) {
       // playlist = playlist.concat(this.constructTrack(cancion));
      }
    });

    return playlist;
  }

  addToPlaylist(track: Track[]) {
    
  }

  setPlaylist(playlist: Track[]) {
    this.playlist = playlist;
  }

  addToPlaylistObservable(cancionesObservable: Observable<any>) {
    let playlist: Track[] = [];

    cancionesObservable.subscribe(mapCanciones => {
      console.log(mapCanciones);
      
      for (let cancion in mapCanciones) {
        console.log(mapCanciones[cancion]);
        console.log(mapCanciones[cancion].Albumes);
        let track: Track = this.constructTrack2(cancion, mapCanciones[cancion]);
        console.log("track");
        console.log(track);
        playlist.push(track);
      }
    })
    this.playlist = playlist;
  }

  start(track: Track)
  {
    console.log(track);
    if(this.player)
    {
      this.player.stop();
    }
    this.player = new Howl({
      src: [track.path],
      html5: true,
      onplay: () => {
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress();
      },
      onend: () => {
      }
    });
  
    this.duracion = this.player.duration();
    
    this.puntoActual = 0;

    this.player.play();
  }

  togglePlayer(pause)
  {
    this.isPlaying = !pause;
    if(pause)
    {
      this.player.pause();
    }
    else
    {
      this.player.play();
    }
  }

  next()
  {
    let index = this.playlist.indexOf(this.activeTrack);
    if(index != this.playlist.length - 1)
    {
      this.start(this.playlist[index + 1]);
    }
    else
    {
      this.start(this.playlist[0]);
    }
  }

  prev()
  {
    let index = this.playlist.indexOf(this.activeTrack);
    if(index > 0)
    {
      this.start(this.playlist[index - 1]);
    }
    else
    {
      this.start(this.playlist[this.playlist.length - 1]);
    }
  }
  
  updateProgress()
  {
    let seek = this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0;
    setTimeout(() => {this.updateProgress();}, 1000)
  }

  getListaCanciones()
  {
    console.log('HOLA ESTOY VIVO');
    return this.http.get('https://playstack.azurewebsites.net/get/song/bygenre?NombreGenero=Rap&Usuario=Rodolfo');
  }

  getCancionesByGenero(genero: string) {
    return this.http.get('https://playstack.azurewebsites.net/get/song/bygenre?NombreGenero=' + genero + '&Usuario=Rodolfo');
  }
}
