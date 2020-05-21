import { Component, OnInit, Input, Pipe, PipeTransform } from '@angular/core';
import { ReproductorService, Playlist } from 'src/app/services/reproductor/reproductor.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

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

  constructor(public rs: ReproductorService, public http: HttpClient,
    private route: ActivatedRoute, private router: Router) {

    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.playlist = this.router.getCurrentNavigation().extras.state.playlist;
      }
    });

  }

  ngOnInit() {
    this.listaCanciones = this.rs.recuperarTracks(this.playlist);
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
      this.playlist.tracks[indice] = this.rs.constructTrack(cancion);
      console.log(this.playlist.tracks);
    }
  }

  playSong(indice: number) {
    console.log("Poner cancion", indice);
    // Establece la lista de reproducción del reproductor como las
    // canciones que hay después de la que se pone (incluida).
    this.rs.setPlaylist(this.playlist.tracks);
    this.rs.start(this.playlist.tracks[indice]);
  }

}