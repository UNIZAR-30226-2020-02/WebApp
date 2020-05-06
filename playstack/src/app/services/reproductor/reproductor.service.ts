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
  duracion: Number;
  
  constructor(private http: HttpClient) { }
  
  constructTrack(cancion: any) {
    let track = {
      nombre: cancion.key,
      artistas: cancion.value.Artistas,
      albumes: cancion.value.Albumes,
      covers: cancion.value.ImagenesAlbum,
      path: cancion.value.url,
      esFavorita: cancion.value.EsFavorita
    };
    console.log("ConstructTrack: "+track);
    console.log("ConstructTrack nombre: "+track.nombre);
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

  constructPlaylist(observableCanciones: Observable<any>) {
    let playlist: Track[];

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
      
      for (let cancion in mapCanciones) {
        let track: Track = this.constructTrack2(cancion, mapCanciones[cancion]);
        playlist.push(track);
      }
    })
    this.playlist = playlist;
  }

  start(track: Track)
  {
    if(this.player)
    {
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
    console.log("Play: poniendo en marcha "+this.activeTrack.nombre);
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
      console.log("Poniendo canción "+ (index + 1));
      console.log("Se titula: "+this.playlist[index + 1].nombre);
      this.start(this.playlist[index + 1]);
    }
    else
    {
      console.log("Poniendo canción 0");
      console.log("Se titula: "+this.playlist[0].nombre);
      this.start(this.playlist[0]);
    }
  }

  prev()
  {
    let index = this.playlist.indexOf(this.activeTrack);
    if(index > 0)
    {
      console.log("Poniendo canción "+ (index - 1));
      console.log("Se titula: "+this.playlist[index - 1].nombre);
      this.start(this.playlist[index - 1]);
    }
    else
    {
      console.log("Poniendo canción "+ (this.playlist.length - 1));
      console.log("Se titula: "+this.playlist[this.playlist.length - 1].nombre);
      this.start(this.playlist[this.playlist.length - 1]);
    }
  }
  
  updateProgress(track: Track)
  {
    this.duracion = this.player.duration();
    //console.log("DURACION: "+this.duracion);
    let seek = this.player.seek();
    //console.log("SEEK: "+seek);
    this.progress = (seek / this.player.duration()) * 100 || 0;
    //console.log("PROGRESS: "+ this.progress);
    if(track === this.activeTrack){setTimeout(() => {this.updateProgress(track);}, 1000)}
  }

  getListaCanciones()
  {
    return this.http.get('https://playstack.azurewebsites.net/get/song/bygenre?NombreGenero=Rap&Usuario=Rodolfo');
  }

  getCancionesByGenero(genero: string) {
    return this.http.get('https://playstack.azurewebsites.net/get/song/bygenre?NombreGenero=' + genero + '&Usuario=Rodolfo');
  }
}
