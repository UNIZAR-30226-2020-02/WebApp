import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { UserInfoService } from '../user-info/user-info.service';

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

  getAccountClass() {
    return this.userAccount.value.toString();
  }
 
  private authenticationState = new BehaviorSubject(false);
  private authenticationID = new BehaviorSubject(null);  //TODO Inicializar a null cuando no estemos en debug
  private authenticationMail = new BehaviorSubject(null);
  private userImageURL = new BehaviorSubject(null);
  private userAccount = new BehaviorSubject(null);
  
  constructor(private storage: Storage, private plt: Platform,private info : UserInfoService) { 
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
    // Obtener datos del usuario logeado desde la BD
    let wasd = await this.info.getUserInfo(user);
    this.authenticationID.next(wasd[0]);
    this.authenticationMail.next(wasd[1]);
    let imgURL = await this.info.getUserImage(user);
    this.setUserImageURL(imgURL);
    let acc = await this.info.getPermissions(user);
    this.userAccount.next(acc);
  }
 
  async logout() {
    await this.storage.remove(TOKEN_KEY);
    this.authenticationState.next(false);
    this.authenticationID.next(null);
    this.authenticationMail.next(null);
    this.userAccount.next(null);
    this.userImageURL.next(null);
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
 /*
 async getUserName(): Promise<string>
  {
    return this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        //Comprobación de que en los dos sitios se almacena lo mismo, por si queréis probarlo
          /*if(res.toString() === this.authenticationID.value.toString()){
          console.log(this.authenticationID.value);
          console.log(res.toString());
        }//
        return res;
      }
    })
  }*/
  getUserName(): string
  {
    return this.authenticationID.value.toString();
  }

  getUserMail(): string
  {
    return this.authenticationMail.value.toString();
  }

  setUserImageURL(url : string)
  {
    this.userImageURL.next(url);
  }
  
  getUserImage() : string
  {
    return this.userImageURL.value.toString();
  }

}