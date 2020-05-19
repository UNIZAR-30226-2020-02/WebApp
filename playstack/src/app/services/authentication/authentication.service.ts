import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

const TOKEN_KEY = 'auth-token';
 
@Injectable({
  providedIn: 'root'
})
/*
 * Este servicio almacena si el usuario está logeado,
 *  así como su nombre de usuario, para poder recuperarlo
 *  y poder hacer peticiones a BD en su nombre, como playlists
 */
export class AuthenticationService {
 
  authenticationState = new BehaviorSubject(false);
  authenticationID = new BehaviorSubject(null);
  
  constructor(private storage: Storage, private plt: Platform) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }
 
  async login(user: string) {
    await this.storage.set(TOKEN_KEY, user);
    this.authenticationState.next(true);
    this.authenticationID.next(user);
  }
 
  async logout() {
    await this.storage.remove(TOKEN_KEY);
    this.authenticationState.next(false);
    this.authenticationID.next(null);
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 

  //Esta función devuelve el nombre del usuario logeado, que de momento se almacena en dos sitios, en el BehaviorSubject
  // que creo que es un observer que notifica a todos los que lo observen o algo así, y en el Storage
  // que creo que es para guardar algún dato en local. No entiendo casi nada de esto, pero creo que había que guardar
  // el nombre de usuario en algún sitio para hacer las peticiones de sus playlists
  //Tal como está devuelve el del Storage
  //Si se quiere cambiar cuál se devuelve creo que hay que comentar todo y poner "return this.authenticationID.value"
  //  y no sé si hay que cambiar lo de async y el tipo de la función a string, lo que importa es que esto funciona
  /*
  async getUserName(): Promise<string>
  {
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        //Comprobación de que en los dos sitios se almacena lo mismo, por si queréis probarlo
          if(res.toString() === this.authenticationID.value.toString()){
          console.log(this.authenticationID.value);
          console.log(res.toString());
        }
        return res;
      }
    })
  }
  */
 async getUserName(): Promise<string>
  {
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        //Comprobación de que en los dos sitios se almacena lo mismo, por si queréis probarlo
          /*if(res.toString() === this.authenticationID.value.toString()){
          console.log(this.authenticationID.value);
          console.log(res.toString());
        }*/
        return res;
      }
    })
  }

}