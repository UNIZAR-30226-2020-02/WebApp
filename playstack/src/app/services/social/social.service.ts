import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private auth: AuthenticationService, private http: HttpClient) { }

  readonly ROOT_URL = 'https://playstack.azurewebsites.net';

  getSiguiendo() {
    let user = this.auth.getUserName();
    let params = new HttpParams().set('Usuario', user);
    return this.http.get(this.ROOT_URL + '/user/get/following', { params });
  }

  getSeguidores() {
    let user = this.auth.getUserName();
    let params = new HttpParams().set('Usuario', user);
    return this.http.get(this.ROOT_URL + '/user/get/followers', { params });
  }

  getSolicitudes() {
    let user = this.auth.getUserName();
    let params = new HttpParams().set('Usuario', user);
    return this.http.get(this.ROOT_URL + '/user/get/followrequests', { params });
  }

  buscarUsuarios(keyword: string) {
    let params = new HttpParams().set('KeyWord', keyword);
    return this.http.get(this.ROOT_URL + '/user/search', { params });
  }


  aceptarSolicitud(usuarioPedido: string) {
    console.log("aceptar: ", usuarioPedido);
  }

  rechazarSolicitud(usuarioPedido: string) {
    console.log("rechazar: ", usuarioPedido);
  }

  // Devuelve la relación entre el usuario que utiliza la aplicación y <usuario>
  //  Foto, Seguidor, Seguido, EnviadaSolicitud, RecibidaSolicitud
  socialSearch(usuario: string) {
    let user = this.auth.getUserName();
    let params = new HttpParams().set('NombreUsuario', user).append('NombreOtroUsuario', usuario);
    return this.http.get(this.ROOT_URL + '/user/socialsearch', { params });
  }



  getAudiosMasEscuchados(usuario: string) {
    let params = new HttpParams().set('Usuario', usuario);
    return this.http.get(this.ROOT_URL + '/get/mostListenedSongs', { params });
  }

  getPlaylistsPublicas(usuario: string) {
    let params = new HttpParams().set('Usuario', usuario);
    return this.http.get(this.ROOT_URL + '/get/publicplaylists', { params });
  }

  getUltimosAudiosEscuchados(usuario: string) {
    let params = new HttpParams().set('Usuario', usuario);
    return this.http.get(this.ROOT_URL + '/user/get/lastsongs', { params });
  }

}
