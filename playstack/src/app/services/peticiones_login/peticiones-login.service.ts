import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionesLoginService {

  constructor( private http : HttpClient ) {}

  hacerLoginUsuario(nombre : string, passwd : string)
  {
    const httpOptions={
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let postParams = {"NombreUsuario": nombre, "Contrasenya": passwd};

    this.http.post("https://playstack.azurewebapps.net/user/login", postParams, httpOptions)
      .subscribe(data => {
        console.log(data['_body']);
        }, error => {
        console.log(error);
      });
  }
}
