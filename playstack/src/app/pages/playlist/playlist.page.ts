import { ContenidoService } from './../../services/contenido/contenido.service';
import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { ReproductorService, Playlist, Cancion } from 'src/app/services/reproductor/reproductor.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {

  playlist: Playlist;

  @Input()
  listaCanciones: Observable<any>;

  showSpinner: boolean = true;
  showError: boolean = false;
  mensajeError: string = "La playlist está vacía";

  constructor(public rs: ReproductorService, public cs: ContenidoService, public http: HttpClient,
    private route: ActivatedRoute, private router: Router, private alertController: AlertController) {

    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.playlist = this.router.getCurrentNavigation().extras.state.playlist;
      }
    });

  }

  ngOnInit() {
    this.listaCanciones = this.cs.recuperarTracks(this.playlist);
    this.cargarCanciones();
    console.log("playlist", this.playlist);
  }

  cargarCanciones() {
    this.listaCanciones.subscribe(
      canciones => {
        this.showSpinner = false;
        if (this.isEmpty(canciones)) {
          this.showError = true;
        }
      },
      error => {
        this.showSpinner = false;
        this.showError = true;
      }
    );
  }

  private isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  addSong(cancion: any, indice: number) {
    if (this.playlist.tracks[indice] === undefined) {
      this.playlist.tracks[indice] = this.cs.constructTrack(cancion);
      console.log(this.playlist.tracks);
    }
  }

  playSong(indice: number) {
    console.log("Poner cancion", indice);
    // Establece la lista de reproducción del reproductor como las
    // canciones que hay después de la que se pone (incluida).
    this.rs.setListaAudio(this.playlist.tracks);
    this.rs.start(this.playlist.tracks[indice]);
  }

  async marcarFavorita(cancion: string) {
    console.log("Favorita:", cancion);
    let resp = await this.cs.addToFavorites(cancion);
    switch(resp)
    {
      case 200: this.ngOnInit();break;
      default: {console.log("Error de post")}
    }
  }

  async desmarcarFavorita(cancion: string) {
    console.log("No Favorita:", cancion);
    let resp = await this.cs.removeFromFavorites(cancion);
    switch(resp)
    {
      case 200: this.ngOnInit();break;
      default: {console.log("Error de post")}
    }
  }

  addToCola(cancion: any) {
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
        message: 'Which name do you like?',
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

  async togglePrivada() {
    let respuesta = await this.cs.actualizarPlaylist(this.playlist.nombre, this.playlist.nombre, !this.playlist.esPrivada);
    switch (respuesta) {
      case 200: {
        console.log("cambiado estado de privacidad");
        this.playlist.esPrivada = !this.playlist.esPrivada;
        break;
      }
      default: {
        console.log("Error al cambiar el estado de privacidad");
        break;
      }
    }
  }

}