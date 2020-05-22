import { Track } from './../../services/reproductor/reproductor.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { ReproductorService } from '../../services/reproductor/reproductor.service';
import { IonSearchbar, IonList, IonItem } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  constructor(private rs:ReproductorService, private router: Router, private activatedRoute: ActivatedRoute) { }

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


  artistas: any;
  errorArtistas: boolean = false;
  buscandoArtistas: boolean = false;


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
      this.errorArtistas = false;
      return;
    }

    this.buscando = true;

    this.errorCanciones = false;
    this.errorPlaylists = false;
    this.errorAlbumes = false;
    this.errorPodcasts = false;
    this.errorArtistas = false;
    
    this.buscandoCanciones = true;
    this.buscandoPlaylists = true;
    this.buscandoAlbumes = true;
    this.buscandoPodcasts = true;
    this.buscandoArtistas = true;

    this.canciones = undefined;
    this.playlists = undefined;
    this.albumes = undefined;
    this.podcasts = undefined;
    this.artistas = undefined;

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
        this.isEmpty(res.Canciones) ? this.errorCanciones = true : ( this.canciones = res.Canciones, this.errorCanciones = false )
        this.buscandoCanciones = false;
        this.isEmpty(res.PlayLists) ? this.errorPlaylists = true : ( this.playlists = res.PlayLists, this.errorPlaylists = false )
        this.buscandoPlaylists = false;
        this.isEmpty(res.Albumes) ? this.errorAlbumes = true : ( this.albumes = res.Albumes, this.errorAlbumes = false )
        this.buscandoAlbumes = false;
        this.isEmpty(res.Podcasts) ? this.errorPodcasts = true : ( this.podcasts = res.Podcasts, this.errorPodcasts = false )
        this.buscandoPodcasts = false; 
        this.isEmpty(res.Artistas) ? this.errorArtistas = true : ( this.artistas = res.Artistas, this.errorArtistas = false )
        this.buscandoArtistas = false;
      }
    )
  }

  private isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }



  playTrack(key: string, value: any) {
    let track: Track = this.rs.constructTrack2(key, value)
    this.rs.start(track);
  }

  openPlaylist(nombre: string, esPrivada: boolean, covers: string[]) {
    let playlist = this.rs.constructPlaylist("Playlist", esPrivada, nombre, covers, []);
    // Abrir pantalla de visualización de playlist pasando a la página el objeto que contiene la playlist
    let navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      state: {
        playlist: playlist
      }
    };
    console.log(this.activatedRoute);
    this.router.navigate(['../../playlist'], navigationExtras);
  }

  
  openArtist(artista: string) {
    let navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      state: {
        nombreArtista: artista
      }
    };
    console.log(this.activatedRoute);
    this.router.navigate(['../../artista'], navigationExtras);
  }
  

  openAlbum(nombre: string, cover: string) {
    let playlist = this.rs.constructPlaylist("Album", false, nombre, [cover], []);
    // Abrir pantalla de visualización de playlist pasando a la página el objeto que contiene la playlist
    let navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      state: {
        playlist: playlist
      }
    };
    console.log(this.activatedRoute);
    this.router.navigate(['../../playlist'], navigationExtras);
  }

  
}
