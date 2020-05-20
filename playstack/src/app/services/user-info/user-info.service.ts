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

  constructor(private http:HttpClient) { }


  getUserInfo(nombre : string){
    return this.http.get("https://playstack.azurewebsites.net/user/get/info?NombreUsuario=" + nombre);
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
    .then(res => {console.log(res.toString());if(res.toString() === "Usuario autenticado correctamente"){ retVal = 201;}})
    .catch(msg => {console.log('Error: ' + msg.status + ' ' + msg.statusText);retVal = msg.status;})
    return retVal;
  }

}
