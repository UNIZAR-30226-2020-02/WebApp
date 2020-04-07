import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
  @ViewChild('passwordEyeRegister', {static: false}) passwordEye: ElementRef;

  showPassword = false;
  passwordToggleIcon = 'eye';

  constructor() { }

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

}
