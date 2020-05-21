import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeticionesRegisterService {

  constructor( private http : HttpClient ) { }

  async hacerRegisterUsuario(nombre : string, passwd : string, email: string): Promise<number>
  {
    console.log("POST EN ACCION");
    let retVal: number;
    const httpOptions={
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let postParams = {"NombreUsuario": nombre, "Contrasenya": passwd, "Correo": email};
    let response = await this.http.post("https://playstack.azurewebsites.net/create/user", postParams, httpOptions).toPromise()
    .then(res => {console.log(res); retVal = 201; })
    .catch(msg => {console.log('Error: ' + msg.status + ' ' + msg.statusText);retVal = msg.status})
    return retVal;
  }
}
