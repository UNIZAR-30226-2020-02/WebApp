import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PeticionesLoginService } from '../../services/peticiones_login/peticiones-login.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
  @ViewChild('passwordEyeRegister', {static: false}) passwordEye: ElementRef;
  usuario = {
    nombre : "",
    passwd : ""
  };

  showPassword = false;
  passwordToggleIcon = 'eye';
  mensajeFormulario = "";

  constructor(private login : PeticionesLoginService, private router: Router, private auth: AuthenticationService) { }

  ngOnInit() {
    
  }

  togglePassword(): void
  {
    this.showPassword = !(this.showPassword);
    if(this.passwordToggleIcon == 'eye')
    {
      this.passwordToggleIcon = 'eye-off';
    }
    else
    {
      this.passwordToggleIcon = 'eye';
    }
  }

  open(id: string) {
    this.router.navigateByUrl('/' + id);
  }

  async hacerLogin()
  {
    let resp : number = await this.login.hacerLoginUsuario(this.usuario.nombre, this.usuario.passwd);
    switch(resp)
      {
        case 201: {await this.auth.login(this.usuario.nombre);this.open("app");
                  this.usuario.nombre = "";this.usuario.passwd = "";this.mensajeFormulario=''; break;}
        case 400: {this.mensajeFormulario='Formato de parámetros incorrecto';break;}
        case 401: {this.mensajeFormulario='Contraseña incorrecta';break;}
        case 404: {this.mensajeFormulario='Nombre de usuario incorrecto';break;}
        default: {this.mensajeFormulario='Error inesperado durante el proceso';break;}
      }

  }

}
