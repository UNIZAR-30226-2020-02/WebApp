import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get('https://playstack.azurewebsites.net/user/get/info?NombreUusuario=Rodolfo');
  }
}
