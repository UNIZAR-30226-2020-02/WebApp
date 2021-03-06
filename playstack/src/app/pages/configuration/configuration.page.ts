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
  colorSuccess: boolean = false;

  constructor(private auth: AuthenticationService, private info : UserInfoService, private rs : ReproductorService) { }

  nombreUsuario: string;
  correoUsuario: string;
  URLimagenUsuario : string;
  suscripcionUsuario : string;

  showPassword: boolean = false;
  passwordToggleIcon: string = 'eye';
  passwordConfirmToggleIcon: string = 'eye';

  mensajeCambioDatos: string = "";

  correo: string;
  nuevoNombreUsuario: string;
  passwd: string;


  ngOnInit() {
    console.log("Entrado");
    // Obtener nombre de usuario desde el módulo de autenticación
    this.nombreUsuario = this.auth.getUserName();
    this.correoUsuario = this.auth.getUserMail();
    this.URLimagenUsuario = this.auth.getUserImage();
    this.suscripcionUsuario = this.auth.getAccountClass();
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
    if(this.nuevoNombreUsuario == null)
    {
      this.mensajeCambioDatos = "Por favor, introduce un nuevo nombre de usuario";
      this.colorSuccess = false;
      parValidos = false;
    }
    else
    {
      parValidos = true;
      let correoRecuperado = this.auth.getUserMail();
      if (!this.checkCorreo(this.correo) ||  !(correoRecuperado === this.correoUsuario)) 
      {
        this.mensajeCambioDatos = "La dirección de correo introducida no es válida";
        this.colorSuccess = false;
        parValidos = false;
      }
      else
      {
        if(parValidos)
        {
          let resp = await this.info.updateUserInfo(this.nombreUsuario, this.nuevoNombreUsuario, this.correo, this.passwd);
          this.correo = null;
          
          if(resp = 201)
          {
            this.mensajeCambioDatos = "¡Tu perfil se ha actualizado correctamente!";
            this.colorSuccess = true;
            await this.auth.login(this.nuevoNombreUsuario);
            this.nombreUsuario = this.nuevoNombreUsuario;
          }
          else
          {
            this.mensajeCambioDatos = "Algo salió mal, por favor, vuelve a intentarlo.";
            this.colorSuccess = false;
          }
          this.nuevoNombreUsuario = null;
        }
      }
    }
  }

  cambiarImagen() {
    console.log("Cambiar imagen");
  }

  logout() {
    this.auth.logout();
    this.rs.stop();
  }


  ionViewDidLeave() {
    this.mensajeCambioDatos = "";
    this.colorSuccess = false;
  }

  actualizar()    //TODO
  {
    return;
  }

}
