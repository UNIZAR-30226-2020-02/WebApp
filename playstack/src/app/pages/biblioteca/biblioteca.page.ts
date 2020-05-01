import { Component, OnInit } from '@angular/core';
import { ReproductorService } from '../../services/reproductor.service';
import { Observable } from 'rxjs';

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

  constructor(public rs: ReproductorService) {
  }

  ngOnInit() {
    this.currentTab = "Musica";
    this.currentTabMusica = "Playlists";
    this.currentTabPodcasts = "Episodios";
  }

  setMusic() {
    this.currentTab = "Musica";
  }

  setPodcasts() {
    this.currentTab = "Podcasts";
  }

  setPlaylists() {
    this.currentTabMusica = "Playlists";
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
