import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialService } from 'src/app/services/social/social.service';
import { isEmpty } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

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
  buscandoGenerosMasEscuchados: boolean = true;

  errorAudiosMasEscuchados: boolean = false;
  errorPlaylistsPublicas: boolean = false;
  errorUltimosAudiosEscuchados: boolean = false;
  errorGenerosMasEscuchados: boolean = false;

  audiosMasEscuchados: Observable<any>;
  playlistsPublicas: Observable<any>;
  ultimosAudiosEscuchados: Observable<any>;
  generosMasEscuchados: Observable<any>;

  constructor(private social: SocialService, private route: ActivatedRoute, private router: Router, private toastController: ToastController) {
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

        this.generosMasEscuchados = this.social.getGenerosMasEscuchados(this.nombreUsuario);
        this.generosMasEscuchados.subscribe(
          res => {
            console.log('generos mas escuchados', res);
            this.buscandoGenerosMasEscuchados = false;
            if (this.isEmpty(res)) {
              this.errorGenerosMasEscuchados = true;
            }
          },
          error => {
            this.buscandoGenerosMasEscuchados = false;
            this.errorGenerosMasEscuchados = true;
          }
        )
      }
    });
  }

  private isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  async dejarDeSeguir() {
    console.log("dejar de seguir a:", this.nombreUsuario);
    let respuesta = await this.social.dejarDeSeguir(this.nombreUsuario)
    if (respuesta == 200) {
      this.presentToast('Has dejado de seguir a ' + this.nombreUsuario, 'success');
      this.seguido = false;
    } else {
      this.presentToast('Ha habido un error', 'danger');
    }
  }

  async enviarSolicitud() {
    console.log("seguir a:", this.nombreUsuario);
    let respuesta = await this.social.enviarSolicitud(this.nombreUsuario)
    if (respuesta == 200) {
      this.presentToast('Has enviado una solicitud a ' + this.nombreUsuario, 'success');
      this.enviadaSolicitud = true;
    } else {
      this.presentToast('Ha habido un error', 'danger');
    }
  }

  async eliminarSolicitud() {
    console.log("seguir a:", this.nombreUsuario);
    let respuesta = await this.social.eliminarSolicitud(this.nombreUsuario)
    if (respuesta == 200) {
      this.presentToast('Has eliminado la solucitud para ' + this.nombreUsuario, 'success');
      this.enviadaSolicitud = false;
    } else {
      this.presentToast('Ha habido un error', 'danger');
    }
  }



  async aceptarSolicitud() {
    console.log("aceptar a:", this.nombreUsuario);
    let respuesta = await this.social.aceptarSolicitud(this.nombreUsuario)
    if (respuesta == 200) {
      this.presentToast('Has aceptado la solicitud de ' + this.nombreUsuario, 'success');
      this.seguidor = false;
    } else {
      this.presentToast('Ha habido un error', 'danger');
    }
  }

  async rechazarSolicitud() {
    console.log("rechazar a:", this.nombreUsuario);
    let respuesta = await this.social.dejarDeSeguir(this.nombreUsuario)
    if (respuesta == 200) {
      this.presentToast('Has rechazado la solicitud de ' + this.nombreUsuario, 'success');
      this.recibidaSolicitud = false;
    } else {
      this.presentToast('Ha habido un error', 'danger');
    }
  }



  async presentToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 4000,
      color: color
    });
    toast.present();
  }
}
