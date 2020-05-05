import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HttpClient } from '@angular/common/http';

import { ReproductorService } from '../../services/reproductor.service';



@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit {

  constructor(private auth: AuthenticationService, private http: HttpClient) { }

  nombreUsuario: string;
  correoUsuario: string;

  showPassword: boolean = false;
  showPasswordConfirm: boolean = false;
  passwordToggleIcon: string = 'eye';
  passwordConfirmToggleIcon: string = 'eye';

  mensajeCambioDatos: string = "";
  mensajeCambioContrasena: string = "";

  nuevoCorreo: string;
  nuevoNombreUsuario: string;
  nuevaPasswd: string;
  nuevaPasswdConfirm: string;


  ngOnInit() {
    console.log("Entrado");
    // Obtener nombre de usuario desde el módulo de autenticación
    this.auth.getUserName().then(value => {

      this.nombreUsuario = value;

      // Obtener correo del usuario desde la BD
      this.http.get("https://playstack.azurewebsites.net/user/get/info?NombreUsuario=" + this.nombreUsuario).subscribe(value => {
        this.correoUsuario = value["Correo"];
      });
    });

  }


  togglePassword(): void {
    this.showPassword = !(this.showPassword);
    if (this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    }
    else {
      this.passwordToggleIcon = 'eye';
    }
  }

  togglePassword2(): void {
    this.showPasswordConfirm = !(this.showPasswordConfirm);
    if (this.passwordConfirmToggleIcon == 'eye') {
      this.passwordConfirmToggleIcon = 'eye-off';
    }
    else {
      this.passwordConfirmToggleIcon = 'eye';
    }
  }

  checkCorreo(correo: string): boolean {
    if (correo == null) {
      return false;
    }
    else {
      let regexCorreo = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regexCorreo.test(correo.toLowerCase());
    }
  }

  checkPasswd(passwd: string, passwdCheck: string): number {
    if (passwd == null || passwd.length < 8) {
      return 1;
    }
    else if (passwdCheck == null || passwd !== passwdCheck) {
      return 2;
    }
    else {
      return 0;
    }
  }


  async cambiarDatos() {
    this.mensajeCambioDatos = "";
    if (!this.nuevoNombreUsuario == null) {
      this.mensajeCambioDatos = "El nombre de usuario está vacío";
    }
    else if (!this.checkCorreo(this.nuevoCorreo)) {
      this.mensajeCambioDatos = "La dirección de correo introducida no es válida";
    }
    else {
      console.log("Los datos son correctos, ahora hay que cambiarlos en la BD");
    }
    /*
    let regExpValida = this.checkParams(this.usuario.correo, this.usuario.nombre, this.usuario.passwd, this.usuario.passwdConfirm);
    switch (regExpValida) {
      case 0:
        {
          let resp: number = await this.register.hacerRegisterUsuario(this.usuario.nombre, this.usuario.passwd, this.usuario.correo);
          switch (resp) {
            case 201: { await this.auth.login(this.usuario.nombre); this.open("app"); break; }
            case 400: { this.mensajeFormulario = 'El usuario ya existe'; break; }
            case 406: { this.mensajeFormulario = 'Error en la petición a la BD'; break; }
            default: { this.mensajeFormulario = 'Error inesperado durante el proceso'; break; }
          }
          break;
        }
      case 1: { this.mensajeFormulario = 'Las contraseñas no coinciden'; break; }
      case 2: { this.mensajeFormulario = 'La dirección de correo introducida no es válida'; break; }
      case 3: { this.mensajeFormulario = 'La contraseña debe tener como mínimo 8 caracteres de longitud'; break; }
      default: { this.mensajeFormulario = 'Los campos introducidos no son válidos'; break; }
    }
    */
  }

  async cambiarPasswd() {
    this.mensajeCambioContrasena = "";
    switch(this.checkPasswd(this.nuevaPasswd, this.nuevaPasswdConfirm)) {
      case 0: { console.log("Las contraseñas son correctas y coinciden, ahora habría que actualizarlo en la BD"); break; }
      case 1: { this.mensajeCambioContrasena = "La contraseña debe tener como mínimo 8 caracteres de longitud"; break; };
      case 2: { this.mensajeCambioContrasena = "Las contraseñas no coinciden"; break; };
    }

    /*
    let regExpValida = this.checkParams(this.usuario.correo, this.usuario.nombre, this.usuario.passwd, this.usuario.passwdConfirm);
    switch (regExpValida) {
      case 0:
        {
          let resp: number = await this.register.hacerRegisterUsuario(this.usuario.nombre, this.usuario.passwd, this.usuario.correo);
          switch (resp) {
            case 201: { await this.auth.login(this.usuario.nombre); this.open("app"); break; }
            case 400: { this.mensajeFormulario = 'El usuario ya existe'; break; }
            case 406: { this.mensajeFormulario = 'Error en la petición a la BD'; break; }
            default: { this.mensajeFormulario = 'Error inesperado durante el proceso'; break; }
          }
          break;
        }
      case 1: { this.mensajeFormulario = 'Las contraseñas no coinciden'; break; }
      case 2: { this.mensajeFormulario = 'La dirección de correo introducida no es válida'; break; }
      case 3: { this.mensajeFormulario = 'La contraseña debe tener como mínimo 8 caracteres de longitud'; break; }
      default: { this.mensajeFormulario = 'Los campos introducidos no son válidos'; break; }
    }
    */
  }



  actualizar() {
    console.log("Actualizar datos")
  }

  cambiarImagen() {
    console.log("Cambiar imagen")
  }

  logout() {
    this.auth.logout();
  }


  ionViewDidLeave() {
    this.mensajeCambioDatos = "";
    this.mensajeCambioContrasena = "";
  }

}
