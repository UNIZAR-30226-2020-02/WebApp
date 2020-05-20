import { Component, OnInit } from '@angular/core';
import { ReproductorService } from '../../services/reproductor/reproductor.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../crear/modal/modal.page';


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


  constructor(public rs: ReproductorService, public http: HttpClient, private modalController: ModalController) {
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

    // Recuperar las playlists
    this.playlists = this.rs.getUserPlaylists();
  }

  setArtistas() {
    this.currentTabMusica = "Artistas";

    // Recuperar artistas
    this.artistas = this.rs.getArtistas();
  }

  setAlbumes() {
    this.currentTabMusica = "Albumes";

    // Recuperar albumes
    this.albumes = this.rs.getRandomAbums();
  }

  setEpisodios() {
    this.currentTabPodcasts = "Episodios";
  }

  setProgramas() {
    this.currentTabPodcasts = "Programas";
  }

  /* Esto es para una ventana emergente para crear la playlist */
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage
    });
    return await modal.present();
  }
}
