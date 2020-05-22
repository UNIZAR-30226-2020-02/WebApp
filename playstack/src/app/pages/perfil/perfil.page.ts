import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialService } from 'src/app/services/social/social.service';
import { isEmpty } from 'rxjs/operators';

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

  buscandoAudiosMasEscuchados: boolean = true;
  buscandoPlaylistsPublicas: boolean = true;
  buscandoUltimosAudiosEscuchados: boolean = true;

  errorAudiosMasEscuchados: boolean = false;
  errorPlaylistsPublicas: boolean = false;
  errorUltimosAudiosEscuchados: boolean = false;

  audiosMasEscuchados: Observable<any>;
  playlistsPublicas: Observable<any>;
  ultimosAudiosEscuchados: Observable<any>;

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

    this.audiosMasEscuchados = this.social.getAudiosMasEscuchados(this.nombreUsuario);
    this.audiosMasEscuchados.subscribe(
      res => {
        console.log('audios mas escuchados:', res);
        this.buscandoAudiosMasEscuchados = false;
        if (this.isEmpty(res)) {
          this.errorAudiosMasEscuchados = true;
        }
      },
      error => {
        this.buscandoAudiosMasEscuchados = false;
        this.errorAudiosMasEscuchados = true;
      }
    )

    this.playlistsPublicas = this.social.getPlaylistsPublicas(this.nombreUsuario);
    this.playlistsPublicas.subscribe(
      res => {
        console.log('playlists publicas:', res);
        this.buscandoPlaylistsPublicas = false;
        if (this.isEmpty(res)) {
          this.errorPlaylistsPublicas = true;
        }
      },
      error => {
        this.buscandoPlaylistsPublicas = false;
        this.errorPlaylistsPublicas = true;
      }
    )

    this.ultimosAudiosEscuchados = this.social.getUltimosAudiosEscuchados(this.nombreUsuario);
    this.ultimosAudiosEscuchados.subscribe(
      res => {
        console.log('ultimos audios escuchados:', res);
        this.buscandoUltimosAudiosEscuchados = false;
        if (this.isEmpty(res)) {
          this.errorUltimosAudiosEscuchados = true;
        }
      },
      error => {
        this.buscandoUltimosAudiosEscuchados = false;
        this.errorUltimosAudiosEscuchados = true;
      }
    )
  }

  private isEmpty(obj) {
    return Object.keys(obj).length === 0;
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
