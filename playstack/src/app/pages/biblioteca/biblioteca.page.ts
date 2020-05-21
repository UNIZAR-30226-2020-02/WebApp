import { Component, OnInit } from '@angular/core';
import { ReproductorService } from '../../services/reproductor/reproductor.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage implements OnInit {
  currentTab: string;
  currentTabMusica: string;
  currentTabPodcasts: string;

  playlists: Observable<any>;
  artistas: Observable<any>;
  albumes: Observable<any>;

  showSpinner: boolean = false;
  showError: boolean = true;
  mensajeError: string = "";


  constructor(public rs: ReproductorService, public http: HttpClient,
     private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentTab = "Musica";
    this.setPlaylists();
  }

  setMusic() {
    this.currentTab = "Musica";
  }

  setPodcasts() {
    this.currentTab = "Podcasts";
  }


  setPlaylists() {
    this.currentTabMusica = "Playlists";
    this.showSpinner = true;
    this.showError = false;
    // Recuperar las playlists
    this.playlists = this.rs.getUserPlaylists();
    this.playlists.subscribe(
      resultado => {
        this.showSpinner = false;
      },
      error => {
        this.showSpinner = false;
        this.mensajeError = "No hay playlists"
        this.showError = true;
      })
  }

  setArtistas() {
    this.currentTabMusica = "Artistas";
    this.showSpinner = true;
    this.showError = false;
    // Recuperar artistas
    this.artistas = this.rs.getArtistas();
    this.artistas.subscribe(
      resultado => {
        this.showSpinner = false;
      },
      error => {
        this.showSpinner = false;
        this.mensajeError = "No hay artistas"
        this.showError = true;
      })
  }

  setAlbumes() {
    this.currentTabMusica = "Albumes";
    this.showSpinner = true;
    this.showError = false;
    // Recuperar albumes
    this.albumes = this.rs.getRandomAbums();
    this.albumes.subscribe(
      resultado => {
        this.showSpinner = false;
      },
      error => {
        this.showSpinner = false;
        this.mensajeError = "No hay albumes"
        this.showError = true;
      })
  }

  setEpisodios() {
    this.currentTabPodcasts = "Episodios";
  }

  setProgramas() {
    this.currentTabPodcasts = "Programas";
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

  /*
  openArtist() {
    console.log("Abrir playlist: ", playlist.tipo, playlist.esPrivada, playlist.nombre);

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
  */

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

  /* Esto es para una ventana emergente para crear la playlist */
  /*async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage
    });
    return await modal.present();
  }*/
}
