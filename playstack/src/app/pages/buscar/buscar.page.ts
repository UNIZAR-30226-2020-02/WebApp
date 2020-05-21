import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { ReproductorService } from '../../services/reproductor/reproductor.service';
import { IonSearchbar, IonList, IonItem } from '@ionic/angular';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  constructor(private rs:ReproductorService) { }

  buscando: boolean;

  resultados: Observable<any>;
  

  canciones: any;
  errorCanciones: boolean = false;
  buscandoCanciones: boolean = false;
  playlists: any;
  errorPlaylists: boolean = false;
  buscandoPlaylists: boolean = false;


  albumes: any;
  errorAlbumes: boolean = false;
  buscandoAlbumes: boolean = false;
  podcasts: any;
  errorPodcasts: boolean = false;
  buscandoPodcasts: boolean = false;


  usuarios: any;
  errorUsuarios: boolean = false;
  buscandoUsuarios: boolean = false;


  ngOnInit() {
    this.buscando = false;
  }

  onSearchChange(e) {
    let value = e.detail.value;

    console.log("cadena busqueda", value);

    if (value == '') {
      this.buscando = false;
      this.errorCanciones = false;
      this.errorPlaylists = false;
      this.errorAlbumes = false;
      this.errorPodcasts = false;
      this.errorUsuarios = false;
      return;
    }

    this.buscando = true;

    this.buscandoCanciones = true;
    this.buscandoPlaylists = true;
    this.buscandoAlbumes = true;
    this.buscandoPodcasts = true;
    this.buscandoUsuarios = true;

    this.canciones = undefined;
    this.playlists = undefined;
    this.albumes = undefined;
    this.podcasts = undefined;
    this.usuarios = undefined;

    this.resultados = this.rs.getSearch(value)
    this.procesarResultados();
  }

  procesarResultados() {
    this.resultados.subscribe(
      res => {
        console.log("resultado busquda", res);
        console.log("playlists", res.PlayLists);
        console.log("playlists", this.isEmpty(res.PlayLists));
        console.log("albumes", res.Albumes);
        console.log("albumes", res.Albumes === {});
        this.isEmpty(res.Canciones) ? this.errorCanciones = true : this.canciones = res.Canciones;
        this.buscandoCanciones = false;
        this.isEmpty(res.PlayLists) ? this.errorPlaylists = true : this.playlists = res.PlayLists;
        this.buscandoPlaylists = false;
        this.isEmpty(res.Albumes) ? this.errorAlbumes = true : this.albumes = res.Albumes;
        this.buscandoAlbumes = false;
        this.isEmpty(res.Podcasts) ? this.errorPodcasts = true : this.podcasts = res.Podcasts;
        this.buscandoPodcasts = false;
        this.isEmpty(res.Usuarios) ? this.errorUsuarios = true : this.usuarios = res.Usuarios;
        this.buscandoUsuarios = false;
      }
    )
  }

  private isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
}
