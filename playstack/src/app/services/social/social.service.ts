import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { ResolvedStaticSymbol } from '@angular/compiler';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private auth: AuthenticationService, private http: HttpClient) { }

  readonly ROOT_URL = 'https://playstack.azurewebsites.net';


  /* Peticiones con GET */

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


  // Devuelve la relación entre el usuario que utiliza la aplicación y <usuario>
  //  Foto, Seguidor, Seguido, EnviadaSolicitud, RecibidaSolicitud
  socialSearch(usuario: string) {
    let user = this.auth.getUserName();
    let params = new HttpParams().set('NombreUsuario', user).append('NombreOtroUsuario', usuario);
    return this.http.get(this.ROOT_URL + '/user/socialsearch', { params });
  }

  getAudiosMasEscuchados(usuario: string) {
    console.log('audios mas escuchados de', usuario);
    let params = new HttpParams().set('Usuario', usuario);
    return this.http.get(this.ROOT_URL + '/user/get/mostListenedSongs', { params }).pipe(
      map(resultado => {
        console.log("audios mas escuchados", resultado);
      })
    );
  }

  getPlaylistsPublicas(usuario: string) {
    console.log('playlists publicas de', usuario);
    let params = new HttpParams().set('NombreUsuario', usuario);
    return this.http.get(this.ROOT_URL + '/get/publicplaylists', { params });
  }

  getUltimosAudiosEscuchados(usuario: string) {
    console.log('ultimos audios de', usuario)
    let params = new HttpParams().set('Usuario', usuario);
    return this.http.get(this.ROOT_URL + '/user/get/lastsongs', { params });
  }


  /* Peticiones con POST */

  // Acepta la solicitud de seguidor
  async aceptarSolicitud(seguidor: string): Promise<number> {
    let user = this.auth.getUserName();
    console.log("Servicio aceptar: ", seguidor);

    let retVal: number;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let postParams = { 'NombreUsuario': user, 'Seguidor': seguidor };
    await this.http.post(this.ROOT_URL + '/user/follow',
      postParams, httpOptions).toPromise()
      .then(res => { console.log(res, 'Solicitud aceptada'); retVal = 200; })
      .catch(msg => { console.log('Error:', msg.status, msg.statusText); retVal = msg.status })

    return retVal;
  }

  // Rechaza la solicitud de seguidor
  async rechazarSolicitud(seguidor: string): Promise<number> {
    let user = this.auth.getUserName();
    console.log("Servicio rechazar: ", seguidor);

    let retVal: number;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let postParams = { 'NombreUsuario': user, 'Seguidor': seguidor };
    await this.http.post(this.ROOT_URL + '/user/reject/followRequest',
      postParams, httpOptions).toPromise()
      .then(res => { console.log(res, 'Solicitud rechazada'); retVal = 200; })
      .catch(msg => { console.log('Error:', msg.status, msg.statusText); retVal = msg.status })

    return retVal;
  }

  // Enviar solicitud
  async enviarSolicitud(seguidor: string): Promise<number> {
    let user = this.auth.getUserName();
    console.log("Servicio rechazar: ", seguidor);

    let retVal: number;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let postParams = { 'NombreUsuario': user, 'Seguido': seguidor };
    await this.http.post(this.ROOT_URL + '/user/add/followRequest',
      postParams, httpOptions).toPromise()
      .then(res => { console.log(res, 'Enviada solicitud'); retVal = 200; })
      .catch(msg => { console.log('Error:', msg.status, msg.statusText); retVal = msg.status })

    return retVal;
  }

  // Eliminar solicitud
  async eliminarSolicitud(seguidor: string): Promise<number> {
    let user = this.auth.getUserName();
    console.log("Servicio rechazar: ", seguidor);

    let retVal: number;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let postParams = { 'NombreUsuario': user, 'Seguido': seguidor };
    await this.http.post(this.ROOT_URL + '/user/remove/followRequest',
      postParams, httpOptions).toPromise()
      .then(res => { console.log(res, 'Solicitud eliminada'); retVal = 200; })
      .catch(msg => { console.log('Error:', msg.status, msg.statusText); retVal = msg.status })

    return retVal;
  }

  // Dejar de seguir
  async dejarDeSeguir(seguidor: string): Promise<number> {
    let user = this.auth.getUserName();
    console.log("Servicio rechazar: ", seguidor);

    let retVal: number;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let postParams = { 'NombreUsuario': user, 'Seguido': seguidor };
    await this.http.post(this.ROOT_URL + '/user/unfollow',
      postParams, httpOptions).toPromise()
      .then(res => { console.log(res, 'Usuario dejado de seguir'); retVal = 200; })
      .catch(msg => { console.log('Error:', msg.status, msg.statusText); retVal = msg.status })

    return retVal;
  }
}
