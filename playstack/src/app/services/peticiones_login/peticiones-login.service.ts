import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionesLoginService {
  constructor( private http : HttpClient ) {}

  hacerLoginUsuario(nombre : string, passwd : string): boolean
  {
    const httpOptions={
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let postParams = {"NombreUsuario": nombre, "Contrasenya": passwd};
    console.log(nombre);
    console.log(passwd);
  
    this.http.post("https://playstack.azurewebsites.net/user/login", postParams, httpOptions)
      .subscribe(data => {
        console.log(data.toString());
        return (data.toString() === "Usuario autenticado correctamente");
        }, error => {
        console.log(error);
        return false;
      });
      console.log("Se ha hecho una petición de login");
      return;
  }
}
