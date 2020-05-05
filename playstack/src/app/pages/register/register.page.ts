import { Component, OnInit } from '@angular/core';
import { PeticionesRegisterService } from 'src/app/services/peticiones_register/peticiones-register.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  usuario = {
    nombre : "",
    passwd : "",
    passwdConfirm : "",
    correo : ""
  };

  showPassword = false;
  showPasswordConfirm = false;
  passwordToggleIcon = 'eye';
  passwordConfirmToggleIcon = 'eye';
  mensajeFormulario = "";

  constructor(private register : PeticionesRegisterService, private router: Router, private auth: AuthenticationService) { }

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

  togglePassword2(): void
  {
    this.showPasswordConfirm = !(this.showPasswordConfirm);
    if(this.passwordConfirmToggleIcon == 'eye')
    {
      this.passwordConfirmToggleIcon = 'eye-off';
    }
    else
    {
      this.passwordConfirmToggleIcon = 'eye';
    }
  }

  open(id: string) {
    this.router.navigateByUrl('/' + id);
  }

  checkParams(correo: string, nombre: string, passwd: string, passwdCheck: string): number
  {
    if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(correo.toLowerCase()))
    {
      if(passwd === passwdCheck)
      {
        if(passwd.length == 8)
        {
          return 0;   //OK
        }
        else
        {
          return 3; //Contraseña muy corta
        }
      }
      else
      {
        return 1;   //Contraseñas no coinciden 
      }
    }
    else
    {
      return 2;   //Regex de email no reconocida
    }
  }

  async hacerRegistro()
  {
    let regExpValida = this.checkParams(this.usuario.correo, this.usuario.nombre, this.usuario.passwd, this.usuario.passwdConfirm);
    switch(regExpValida)
    {
      case 0:
        {
          let resp : number = await this.register.hacerRegisterUsuario(this.usuario.nombre, this.usuario.passwd, this.usuario.correo);
          switch(resp)
          {
            case 201: {await this.auth.login(this.usuario.nombre);this.open("app"); break;}
            case 400: {this.mensajeFormulario='El usuario ya existe';break;}
            case 406: {this.mensajeFormulario='Error en la petición a la BD';break;}
            default: {this.mensajeFormulario='Error inesperado durante el proceso';break;}
          }
          break;
        }
      case 1: { this.mensajeFormulario='Las contraseñas no coinciden'; break; }
      case 2: { this.mensajeFormulario='La dirección de correo introducida no es válida'; break; }
      case 3: { this.mensajeFormulario='La contraseña debe tener como mínimo 8 caracteres de longitud'; break; }
      default:{ this.mensajeFormulario='Los campos introducidos no son válidos'; break; }
    }
  }
}
