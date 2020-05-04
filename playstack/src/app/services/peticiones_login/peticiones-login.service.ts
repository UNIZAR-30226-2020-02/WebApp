import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeticionesLoginService {
  constructor( private http : HttpClient ) {}


  async hacerLoginUsuario(nombre : string, passwd : string): Promise<number>
  {
    let retVal: number;
    const httpOptions={
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let postParams = {"NombreUsuario": nombre, "Contrasenya": passwd};
    let response = await this.http.post("https://playstack.azurewebsites.net/user/login", postParams, httpOptions).toPromise()
    .then(res => {if(res.toString() === "Usuario autenticado correctamente"){ retVal = 201;};})
    .catch(msg => {console.log('Error: ' + msg.status + ' ' + msg.statusText);retVal = msg.status;})
    
    return retVal;
  }
}
