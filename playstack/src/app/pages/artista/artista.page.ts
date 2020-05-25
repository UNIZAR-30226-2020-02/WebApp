import { ContenidoService } from './../../services/contenido/contenido.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ReproductorService } from 'src/app/services/reproductor/reproductor.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

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
      private rs: ReproductorService, private cs: ContenidoService, private alertController: AlertController) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        let state = this.router.getCurrentNavigation().extras.state;
        this.nombreArtista = state.nombreArtista;
        this.foto = state.image;
      }
    });
    this.canciones = this.cs.getCancionesByArtista(this.nombreArtista);
    this.albumes = this.cs.getArtistaAlbums(this.nombreArtista);
    this.showSpinner = false;
  }

  openAlbum(nombre: string, cover: string) {
    let playlist = this.cs.constructPlaylist("Album", false, nombre, [cover], []);
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

  playSong(cancion: any){
    let c = this.cs.constructTrack(cancion);
    this.rs.start(c); 
  }

  async marcarFavorita(cancion: string) {
    console.log("Favorita:", cancion);
    let resp = await this.cs.addToFavorites(cancion);
    switch(resp)
    {
      case 200: this.canciones = this.cs.getCancionesByArtista(this.nombreArtista); break;
      default: {console.log("Error de post")}
    }
  }

  async desmarcarFavorita(cancion: string) {
    console.log("No Favorita:", cancion);
    let resp = await this.cs.removeFromFavorites(cancion);
    switch(resp)
    {
      case 200: this.canciones = this.cs.getCancionesByArtista(this.nombreArtista); break;
      default: {console.log("Error de post")}
    }
  }

  addToCola(cancion) {
    console.log("Añadir", cancion.key, "a la cola");
    this.rs.addToCola(this.cs.constructTrack(cancion));
  }

  async addToPlaylist(cancion: string) {
    let playlists = await this.cs.getUserPlaylistsArray();
    if (playlists == null) {
      console.log("Error al recuperar las playlists");
    }
    else if (playlists == []) {
      console.log("No hay playlists");
    }
    else {
      // El usuario elige una playlist
      var options = {
        title: 'Choose the name',
        message: 'Añadir a playlist',
        inputs: [],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Aceptar',
            handler: async data => {
              console.log("seleccionada", data, "cancion", cancion);
              let respuesta = await this.cs.addToPlaylist(data, cancion);
              switch (respuesta) {
                case 200: console.log("se ha añadido la canción"); break;
                default: console.log("No se ha podido añadir la cancion"); break;
              }
            }
          }
        ]
      };

      // Now we add the radio buttons
      options.inputs.push({ name : 'playlist', value: playlists[0], label: playlists[0], type: 'radio', checked: true });
      for(let i=1; i < playlists.length; i++) {
        options.inputs.push({ name : 'playlist', value: playlists[i], label: playlists[i], type: 'radio' });
      }
      // Create the alert with the options
      let alert = await this.alertController.create(options);
      alert.present();
    }
    // this.cs.addToPlaylist(cancion);
  }
}
