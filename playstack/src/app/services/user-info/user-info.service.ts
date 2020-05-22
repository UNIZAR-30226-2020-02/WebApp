import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  nombre : string;
  correo: string;
}

@Injectable({
  providedIn: 'root'
})


export class UserInfoService {
  userInfo : any;
  constructor(private http:HttpClient) { }


  async getUserInfo(nombre : string)
  {
    return await this.http.get("https://playstack.azurewebsites.net/user/get/info?NombreUsuario=" + nombre)
    .toPromise().then(res => {
      if (res) {
          return [res["NombreUsuario"], res["Correo"]];
          /*this.authenticationID.next(res["NombreUsuario"]);
          this.authenticationMail.next(res["Correo"]);
          this.authenticationState.next(true);
          console.log(this.authenticationID.value);
          console.log(this.authenticationMail.value);*/
        }
      })
  }


  async updateUserInfo(nombreActual: string, nombreNuevo : string, correo : string, passwd : string) : Promise<number>
  {
    //TODO probar
    let retVal: number;
    const httpOptions={
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let postParams = {
      "NombreUsuarioActual": nombreActual,
      "NuevoNombreUsuario": nombreNuevo,
      "NuevaContrasenya": passwd,
      "NuevoCorreo": correo
    };
    let resp = await this.http.post("https://playstack.azurewebsites.net/user/update/fields", postParams, httpOptions).toPromise()
    .then(res => {console.log(res);if(res.toString() === "Usuario autenticado correctamente"){ retVal = 201;}})
    .catch(msg => {console.log('Error: ' + msg.status + ' ' + msg.statusText);retVal = msg.status;})
    return retVal;
  }


  async getUserImage(nombreUser : string)
  {
    return await this.http.get("https://playstack.azurewebsites.net/user/get/profilephoto?Usuario="+nombreUser).toPromise()
    .then(res => {
      if(res)
      {
        return res["FotoDePerfil"];
      }
    })
    .catch(msg => {console.log('Error en getUserImage: ' + msg.status + ' ' + msg.statusText);});
  }

  async getPermissions(user: string) {
    return await this.http.get("https://playstack.azurewebsites.net/user/get/permissions?Usuario="+user).toPromise()
    .then(res => {
      if(res)
      {
        return res["Permiso"];
      }
    })
    .catch(msg => {console.log('Error en getUserImage: ' + msg.status + ' ' + msg.statusText);});
  }

}
