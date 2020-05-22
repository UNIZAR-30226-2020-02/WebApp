import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ReproductorService } from 'src/app/services/reproductor/reproductor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.page.html',
  styleUrls: ['./artista.page.scss'],
})
export class ArtistaPage implements OnInit {
  canciones: Observable<any>;
  albumes: Observable<any>;
  nombreArtista: string;
  foto: string;
  showSpinner: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router,
      private rs: ReproductorService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        let state = this.router.getCurrentNavigation().extras.state;
        this.nombreArtista = state.nombreArtista;
        this.foto = state.image;
      }
    });
    this.canciones = this.rs.getCancionesByArtista(this.nombreArtista);
    this.albumes = this.rs.getArtistaAlbums(this.nombreArtista);
    this.showSpinner = false;
  }

  openAlbum(nombre: string, cover: string) {
    let playlist = this.rs.constructPlaylist("Album", false, nombre, [cover], []);
    // Abrir pantalla de visualización de playlist pasando a la página el objeto que contiene la playlist
    let navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      state: {
        playlist: playlist
      }
    };
    console.log(this.route);
    this.router.navigate(['../../playlist'], navigationExtras);
  }

}