import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { HttpClient } from '@angular/common/http';

import { ReproductorService } from '../../services/reproductor/reproductor.service';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';



@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})

export class ConfigurationPage implements OnInit {

  constructor(private auth: AuthenticationService, private info : UserInfoService) { }

  nombreUsuario: string;
  correoUsuario: string;

  showPassword: boolean = false;
  showPasswordConfirm: boolean = false;
  passwordToggleIcon: string = 'eye';
  passwordConfirmToggleIcon: string = 'eye';

  mensajeCambioDatos: string = "";

  nuevoCorreo: string;
  nuevoNombreUsuario: string;
  nuevaPasswd: string;
  nuevaPasswdConfirm: string;


  ngOnInit() {
    console.log("Entrado");
    // Obtener nombre de usuario desde el módulo de autenticación
    this.nombreUsuario = this.auth.getUserName();

    // Obtener correo del usuario desde la BD
    let wasd = this.info.getUserInfo(this.nombreUsuario);
    console.log("MATADME POR FAVOR");
    wasd.subscribe(value => {
      this.correoUsuario = value["Correo"];
      console.log(this.correoUsuario);
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
    let parValidos : Boolean;
    if(this.nuevoNombreUsuario == null && this.nuevoCorreo == null)
    {
      this.mensajeCambioDatos = "Por favor, introduce alguno de los campos que quieras actualizar";
      parValidos = false;
    }
    else
    {
      parValidos = true;
      if (this.nuevoNombreUsuario == null) {
        this.nuevoNombreUsuario = this.nombreUsuario;
      }
      else if(this.nuevoCorreo == null)
      {
        this.nuevoCorreo = this.correoUsuario;
      }
      if (!this.checkCorreo(this.nuevoCorreo)) 
      {
        this.mensajeCambioDatos = "La dirección de correo introducida no es válida";
        parValidos = false;
      }
      else if(this.checkPasswd(this.nuevaPasswd, this.nuevaPasswdConfirm))
      {
        this.mensajeCambioDatos = "Las contraseñas que has introducido no coinciden";
        parValidos = false;
      }
      else
      {
        if(parValidos)
        {
          let resp = await this.info.updateUserInfo(this.nombreUsuario, this.nuevoNombreUsuario, this.nuevoCorreo, this.nuevaPasswd);
          console.log("Datos cambiados, o eso creo");
          //switch(resp);
        }
      }
    }
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
    
  }*/


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
    
  }*/

}
