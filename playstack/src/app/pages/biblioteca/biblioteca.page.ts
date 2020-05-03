import { Component, OnInit } from '@angular/core';
import { ReproductorService } from '../../services/reproductor.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage implements OnInit {
  currentTab: string;
  currentTabMusica: string;
  currentTabPodcasts: string;
  listado: Observable<any>;

  constructor(public rs: ReproductorService, public http: HttpClient) {
  }

  playlists: Observable<any>;

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

    // Recuperar las playlists
    this.playlists = this.http.get('https://playstack.azurewebsites.net/get/playlists?NombreUsuario=Rodolfo');
  }

  setArtistas() {
    this.currentTabMusica = "Artistas";
  }

  setAlbumes() {
    this.currentTabMusica = "Albumes";
  }

  setEpisodios() {
    this.currentTabPodcasts = "Episodios";
  }

  setProgramas() {
    this.currentTabPodcasts = "Programas";
  }

}
