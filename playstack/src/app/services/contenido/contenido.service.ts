import { Episodio } from './../reproductor/reproductor.service';
import { Podcast } from 'src/app/services/reproductor/reproductor.service';
import { Injectable } from '@angular/core';
import { Playlist, Cancion } from '../reproductor/reproductor.service';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  readonly ROOT_URL = 'https://playstack.azurewebsites.net';



  /* Búsqueda y construcción de listas de reproducción */

  /*
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
  */



  constructTrack(cancion: any) {
    // Corregir error del backend
    let covers = cancion.value.ImagenesAlbums
    if (!covers) {
      covers = cancion.value.ImagenesAlbum;
    }
    let track = new Cancion(cancion.key, cancion.value.url, covers, cancion.value.Artistas, cancion.value.Albumes, cancion.value.EsFavorita);
    return track;
  }

  constructTrack2(key: string, value: any) {
    // Corregir error del backend
    let covers = value.ImagenesAlbums
    if (!covers) {
      covers = value.ImagenesAlbum;
    }
    let track = new Cancion(key, value.url, covers, value.Artistas, value.Albumes, value.EsFavorita);
    return track;
  }

  constructPlaylist(tipo: string, esPrivada: boolean, nombre: string, covers: string[], tracks: Cancion[]) {
    let playlist = new Playlist(tipo, esPrivada, nombre, covers, tracks);
    return playlist;
  }


  constructPodcast(titulo: string, descripcion: string, idioma: string, foto: string, tema: string, interlocutores: string[], episodios: Episodio[]) {
    let podcast = new Podcast(titulo, descripcion, idioma, foto, tema, interlocutores, episodios);
    return podcast;
  }

  getTodosGeneros() {
    return this.http.get(this.ROOT_URL + '/get/allgenders');
  }

  getTodosArtistas() {
    return this.http.get(this.ROOT_URL + '/get/allartists');
  }

  getTodosPodcasts() {
    return this.http.get(this.ROOT_URL + '/get/allpodcasts');
  }

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

  getAllPodcasts() {
    return this.http.get(this.ROOT_URL + '/get/allpodcasts');
  }

  getInformacionPodcast(program: string) {
    let params = new HttpParams().set('NombrePodcast', program);
    return this.http.get(this.ROOT_URL + '/get/podcast/all', { params });
  }

  getPodcastsFollowed() {
    let user = this.auth.getUserName();
    let params = new HttpParams().set('NombreUsuario', user);
    return this.http.get(this.ROOT_URL + '/get/podcast/followed', { params });
  }

  recuperarTracks(playlist: Playlist): any {
    // Dependiendo del tipo de la playlist, realizar una consulta u otra para recuperar sus canciones de la BD
    let canciones: Observable<any>;
    let tracks: Cancion[] = [];

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

  async getUserPlaylistsArray() {
    let playlists: string[] = [];
    let user = this.auth.getUserName();
    let params = new HttpParams().set('NombreUsuario', user);
    console.log("Recuperar playlists", user, params);
    await this.http.get(this.ROOT_URL + '/get/playlists', { params }).toPromise()
      .then(resultado => {
        console.log(resultado);
        for (let playlist in resultado) {
          playlists.push(playlist);
        }
      })
      .catch(error => {
        console.log("Error");
        playlists = null;
      });
    console.log(playlists);
    return playlists;
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

  async addToFavorites(song: string) {
    let user = this.auth.getUserName();

    let retVal: number;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let postParams = { 'Usuario': user, 'Titulo': song };
    await this.http.post(this.ROOT_URL + '/user/add/song/tofavorites',
      postParams, httpOptions).toPromise()
      .then(res => { console.log(res, 'Solicitud aceptada'); retVal = 200; })
      .catch(msg => { console.log('Error:', msg.status, msg.statusText); retVal = msg.status })

    return retVal;
  }

  async removeFromFavorites(song: string) {
    let user = this.auth.getUserName();

    let retVal: number;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let postParams = { 'Usuario': user, 'Titulo': song };

    await this.http.post(this.ROOT_URL + '/user/remove/song/fromfavorites',
      postParams, httpOptions).toPromise()
      .then(res => { console.log(res, 'Solicitud aceptada'); retVal = 200; })
      .catch(msg => { console.log('Error:', msg.status, msg.statusText); retVal = msg.status })

    return retVal;
  }

  async addToPlaylist(playlist: string, cancion: string) {
    let user = this.auth.getUserName();
    let retVal: number;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let postParams = { 'NombreUsuario': user, 'NombrePlayList': playlist, 'NombreCancion': cancion };

    await this.http.post(this.ROOT_URL + '/user/add/song/toplaylist',
      postParams, httpOptions).toPromise()
      .then(res => { console.log(res, 'Solicitud aceptada'); retVal = 200; })
      .catch(msg => { console.log('Error:', msg.status, msg.statusText); retVal = msg.status })

    return retVal;
  }

  async removeFromPlaylist(playlist: string, cancion: string) {
    let user = this.auth.getUserName();
    let retVal: number;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let postParams = { 'NombreUsuario': user, 'NombrePlayList': playlist, 'NombreCancion': cancion };

    await this.http.post(this.ROOT_URL + '/user/remove/song/fromplaylist',
      postParams, httpOptions).toPromise()
      .then(res => { console.log(res, 'Solicitud aceptada'); retVal = 200; })
      .catch(msg => { console.log('Error:', msg.status, msg.statusText); retVal = msg.status })

    return retVal;
  }

  async crearPlaylist(nombre: string, esPrivada: boolean) {
    let user = this.auth.getUserName();
    let retVal: number;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let postParams = { 'NombreUsuario': user, 'NombrePlayList': nombre, 'EsPrivado': esPrivada };

    await this.http.post(this.ROOT_URL + '/create/playlist',
      postParams, httpOptions).toPromise()
      .then(res => { console.log(res, 'Playlist creada'); retVal = 200; })
      .catch(msg => { console.log('Error:', msg.status, msg.statusText); retVal = msg.status })

    return retVal;
  }

  async actualizarPlaylist(nombrePlaylist: string, nuevoNombrePlaylist: string, nuevoPrivado: boolean) {
    let user = this.auth.getUserName();
    let retVal: number;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let postParams = {
      'NombreUsuario': user, 'NombrePlayList': nombrePlaylist,
      'NuevoNombre': nuevoNombrePlaylist, 'NuevoPrivado': nuevoPrivado
    };

    console.log("actualizar playlist", user, nombrePlaylist, nuevoNombrePlaylist, nuevoPrivado);

    await this.http.post(this.ROOT_URL + '/user/update/playlist',
      postParams, httpOptions).toPromise()
      .then(res => { console.log('Cambiado estado'); retVal = 200; })
      .catch(msg => { console.log('Error:', msg.status, msg.statusText); retVal = msg.status })

    return retVal;
  }
}

