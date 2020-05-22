import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { map } from 'rxjs/operators';

export interface Audio {

}

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
  covers: string[];
  tracks: Track[];
}

export interface ColaReproduccion {
  tracks: Track[];
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

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  getDuration(): number {
    return this.player.duration();
  }

  setPlaylist(playlist: Track[]) {
    this.playlist = playlist;
  }

  stop()
  {
    this.player.stop();
    delete this.player;
  }

  start(track: Track) {
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
      console.log("Poniendo canción " + (this.playlist.length - 1));
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

  generos: Playlist[] = [{ tipo: "Genero", esPrivada: false, nombre: "Hip Hop", covers: ["assets/albumes/RapGenre.png"], tracks: [] },
  { tipo: "Genero", esPrivada: false, nombre: "Dance", covers: ["assets/albumes/TechnoGenre.png"], tracks: [] },
  { tipo: "Genero", esPrivada: false, nombre: "Latin", covers: ["assets/albumes/LatinGenre.png"], tracks: [] },
  { tipo: "Genero", esPrivada: false, nombre: "Pop", covers: ["assets/albumes/PopGenre.png"], tracks: [] }];
  getGeneros() {
    return this.generos;
  }

  artistas: Playlist[] = [{ tipo: "Artista", esPrivada: false, nombre: "Macklemore", covers: ["assets/artistas/macklemore.jpg"], tracks: [] },
  { tipo: "Artista", esPrivada: false, nombre: "Eminem", covers: ["assets/artistas/eminem.jpg"], tracks: [] },
  { tipo: "Artista", esPrivada: false, nombre: "Da tweekaz", covers: ["assets/artistas/datweekaz.jpg"], tracks: [] },
  { tipo: "Artista", esPrivada: false, nombre: "Timmy trumpet", covers: ["assets/artistas/timmytrumpet.jpg"], tracks: [] }];
  getArtistasHome() {
    return this.artistas;
  }


  constructTrack(cancion: any) {
    let track: Track = {
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
    let track: Track = {
      nombre: key,
      artistas: value.Artistas,
      albumes: value.Albumes,
      covers: value.ImagenesAlbum,
      path: value.url,
      esFavorita: value.EsFavorita
    };
    return track;
  }

  constructPlaylist(tipo: string, esPrivada: boolean, nombre: string, covers: string[], tracks: Track[]) {
    let playlist: Playlist = {
      tipo: tipo,
      esPrivada: esPrivada,
      nombre: nombre,
      covers: covers,
      tracks: tracks
    };
    return playlist;
  }

  // TODO: usuario
  getCancionesByGenero(genero: string) {
    let user = this.auth.getUserName();
    let params = new HttpParams().set('NombreGenero', genero).append('Usuario', user);
    return this.http.get(this.ROOT_URL + '/get/song/bygenre', { params });
  }

  getCancionesByArtista(artista: string) {
    let user = this.auth.getUserName();
    let params = new HttpParams().set('NombreArtista', artista).append('NombreUsuario', user);
    return this.http.get(this.ROOT_URL + '/get/song/byartist', { params });
  }

  getCancionesByAlbum(album: string) {
    let user = this.auth.getUserName();
    let params = new HttpParams().set('NombreAlbum', album).append('NombreUsuario', user);
    return this.http.get(this.ROOT_URL + '/get/song/byalbum', { params });
  }

  getCancionesByPlaylist(playlist: string) {
    let user = this.auth.getUserName();
    let params = new HttpParams().set('NombrePlayList', playlist).append('NombreUsuario', user);
    return this.http.get(this.ROOT_URL + '/get/playlist/songs', { params });
  }

  getCancionesFavoritas() {
    let user = this.auth.getUserName();
    let params = new HttpParams().set('NombreUsuario', user);
    return this.http.get(this.ROOT_URL + '/get/favoritesongs', { params });
  }
  getAllPodcasts(){
    return this.http.get(this.ROOT_URL + '/get/allpodcasts');
  }
  getEpisodios(program: string){
    let params = new HttpParams().set('NombrePodcast', program);
    return this.http.get(this.ROOT_URL + '/get/podcast/episodes', { params });
  }

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
        canciones = this.getCancionesByAlbum(playlist.nombre);
        break;
      }
      case "Playlist": {
        canciones = this.getCancionesByPlaylist(playlist.nombre);
        break;
      }
      case "Favoritas": {
        canciones = this.getCancionesFavoritas();
        break;
      }
    }

    return canciones;

  }

  getUserPlaylists() {
    let user = this.auth.getUserName();
    let params = new HttpParams().set('NombreUsuario', user);
    console.log("Recuperar playlists", user, params);
    return this.http.get(this.ROOT_URL + '/get/playlists', { params });
  }

  getArtistas() {
    return this.http.get(this.ROOT_URL + '/get/allartists');
  }

  getRandomAbums() {
    return this.http.get(this.ROOT_URL + '/get/randomalbums');
  }

  getSearch(keyword: string) {
    let user = this.auth.getUserName();
    let params = new HttpParams().set('KeyWord', keyword).append('NombreUsuario', user);
    console.log("consulta busqueda", this.ROOT_URL + '/search?KeyWord=' + keyword);
    return this.http.get(this.ROOT_URL + '/search', { params });
  }

  getArtistaAlbums(artista: string) {
    let params = new HttpParams().set('NombreArtista', artista);
    console.log("consulta artista", this.ROOT_URL + '/search?nombreArtista=' + artista);
    return this.http.get(this.ROOT_URL + '/get/artist/albums', { params });
  }
}
