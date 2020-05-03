import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PeticionesLoginService } from '../../services/peticiones_login/peticiones-login.service';

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

  constructor(private login : PeticionesLoginService) { }

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

  hacerLogin()
  {
    console.log(this.login.hacerLoginUsuario(this.usuario.nombre,this.usuario.passwd));
  }

}
