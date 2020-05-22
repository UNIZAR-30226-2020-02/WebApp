import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialService } from 'src/app/services/social/social.service';
//import { ConsoleReporter } from 'jasmine'; //Esto no funcionaba

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nombreUsuario: string;
  foto: string;
  seguidor: boolean;
  seguido: boolean;
  enviadaSolicitud: boolean;
  recibidaSolicitud: boolean;

  buscandoCancionesPodcasts: boolean = true;
  buscandoGeneros: boolean = true;
  buscandoUltimas: boolean = true;
  buscandoPlaylists: boolean = true;

  constructor(private social : SocialService, private route: ActivatedRoute, private router: Router) {
  }

  // Cargar datos pasados a la página
  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        let state = this.router.getCurrentNavigation().extras.state;
        this.nombreUsuario = state.nombreUsuario;
        this.foto = state.foto;
        this.seguidor = state.seguidor;
        this.seguido = state.seguido;
        this.enviadaSolicitud = state.enviadaSolicitud;
        this.recibidaSolicitud = state.recibidaSolicitud;
      }
    });
  }

  dejarDeSeguir() {
    console.log("dejar de seguir a:", this.nombreUsuario);
  }

  seguir() {
    console.log("seguir a:", this.nombreUsuario);
  }

  aceptarSolicitud() {
    console.log("aceptar a:", this.nombreUsuario);
  }

  rechazarSolicitud() {
    console.log("rechazar a:", this.nombreUsuario);
  }

}
