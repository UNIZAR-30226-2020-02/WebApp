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

  resultado: Observable<any>;
  

  canciones: Observable<any>;
  errorCanciones: boolean;
  playlists: Observable<any>;
  errorPlaylists: boolean;


  albumes: Observable<any>;
  errorAlbumes: boolean;
  podcasts: Observable<any>;
  errorPodcasts: boolean;


  usuarios: Observable<any>;
  errorUsuarios: boolean;


  ngOnInit() {
    this.buscando = false;
  }

  onSearchChange(e) {
    let value = e.detail.value;

    console.log("cadena busqueda", value);

    if (value == '') {
      this.buscando = false;
      return;
    }

    this.buscando = true;
    this.resultado = this.rs.getSearch(value)
    this.resultado.subscribe(
      res => { console.log("result busqueda", res) }
    )
    console.log("resul busqueda", this.resultado);

    this.canciones = this.buscarTipo("Canciones");
    this.canciones.subscribe(
      res => { console.log("resul canciones", res); }
    )
    this.playlists = this.buscarTipo("PlayLists");

    this.albumes = this.buscarTipo("Albumes");
    this.podcasts = this.buscarTipo("Podcasts");

    this.usuarios = this.buscarTipo("Usuarios");

  }

  buscarTipo(tipo: string): Observable<any> {
    return this.resultado.pipe(
      map( res => { return res[tipo] })
    )
  }
}
