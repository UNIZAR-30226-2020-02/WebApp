import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard/auth-guard.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';


//TODO creo que hay que poner aqui lo de routes con las cosas 

@Component({
  selector: 'app-tabs',
  templateUrl: './split-pane.page.html',
  styleUrls: ['./split-pane.page.scss'],
})
export class SplitPanePage implements OnInit {

  public playlists = ["Éxitos de España", "Canciones favoritas", "Mi Playlist"];

  nombreUsuario: string;

  constructor(private router: Router, private auth: AuthenticationService) { }

    async ngOnInit() {
      this.nombreUsuario = await this.auth.getUserName();
      console.log("Usuario: ", this.nombreUsuario);
    }

    open(id: string) {
      this.router.navigateByUrl('/' + id);
    }

}
