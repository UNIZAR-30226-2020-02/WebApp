import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SocialService } from 'src/app/services/social/social.service';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.scss'],
})
export class SocialPage implements OnInit {
  currentTab: string;

  siguiendo: Observable<any>;
  buscandoSiguiendo: boolean = false;
  errorSiguiendo = false;

  seguidores: Observable<any>;
  buscandoSeguidores: boolean = false;
  errorSeguidores = false;

  solicitudes: Observable<any>;
  buscandoSolicitudes: boolean = false;
  errorSolicitudes = false;

  resultadosBusqueda: Observable<any>;
  buscando: boolean = false;
  buscandoUsuarios: boolean = false;
  errorBusqueda: boolean = false;

  constructor(private social: SocialService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.setSiguiendo()
  }

  /* Siguiendo, seguidores, y solicitudes */
  setSiguiendo() {
    this.buscandoSiguiendo = true;
    this.errorSiguiendo = false;
    this.currentTab = "Siguiendo";
    this.siguiendo = this.social.getSiguiendo();
    this.siguiendo.subscribe(
      res => {
        console.log("siguiendo: ", res);
        this.buscandoSiguiendo = false;
        if (this.isEmpty(res)) {
          this.errorSiguiendo = true;
        }
      },
      error => {
        this.buscandoSiguiendo = false;
        this.errorSiguiendo = true;
      });
  }

  setSeguidores() {
    this.buscandoSeguidores = true;
    this.errorSeguidores = false;
    this.currentTab = "Seguidores";
    this.seguidores = this.social.getSeguidores();
    this.seguidores.subscribe(
      res => {
        console.log("seguidores: ", res);
        this.buscandoSeguidores = false;
        if (this.isEmpty(res)) {
          this.errorSeguidores = true;
        }
      },
      error => {
        this.buscandoSeguidores = false;
        this.errorSeguidores = true;
      });
  }

  setSolicitudes() {
    this.buscandoSolicitudes = true;
    this.errorSolicitudes = false;
    this.currentTab = "Solicitudes";
    this.solicitudes = this.social.getSolicitudes();
    this.solicitudes.subscribe(
      res => {
        console.log("solicitudes: ", res);
        this.buscandoSolicitudes = false;
        if (this.isEmpty(res)) {
          this.errorSolicitudes = true;
        }
      },
      error => {
        this.buscandoSolicitudes = false;
        this.errorSolicitudes = true;
      });
  }

  setBuscar() {
    this.currentTab = "Buscar";
  }

  onSearchChange(e) {
    let value = e.detail.value;
    console.log("cadena busqueda", value);

    this.errorBusqueda = false;

    if (value == '') {
      this.buscando = false;
      this.buscandoUsuarios = false;
      return;
    }

    this.buscando = true;
    this.buscandoUsuarios = true;
    this.resultadosBusqueda = this.social.buscarUsuarios(value);

    this.resultadosBusqueda.subscribe(
      res => {
        console.log("resultados búsqueda ", res);
        this.buscandoUsuarios = false;
        this.errorBusqueda = false;
        if (this.isEmpty(res)) {
          this.errorBusqueda = true;
        }
        error => {
          this.buscandoUsuarios = false;
          this.errorBusqueda = true;
        }
      })
  }

  aceptarSolicitud(usuarioPedido: string) {
    this.social.aceptarSolicitud(usuarioPedido);
  }

  rechazarSolicitud(usuarioPedido: string) {
    this.social.rechazarSolicitud(usuarioPedido);
  }

  private isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  openPerfil(usuario: string) {
    // Abrir pantalla de visualización de playlist pasando a la página el objeto que contiene la playlist
    this.social.socialSearch(usuario).subscribe(
      res => {
        console.log("Abrir usuario", usuario, res)
        let navigationExtras: NavigationExtras = {
          relativeTo: this.activatedRoute,
          state: {
            nombreUsuario: usuario,
            foto: res['Foto'],
            seguidor: res['Seguidor'],
            seguido: res['Seguido'],
            enviadaSolicitud: res['EnviadaSolicitud'],
            recibidaSolicitud: res['RecibidaSolicitud']
          }
        };
        console.log(this.activatedRoute);
        this.router.navigate(['../../perfil'], navigationExtras);
      });
  }

}
