import { Component, OnInit, Input } from '@angular/core';
import { ReproductorService, Playlist } from 'src/app/services/reproductor/reproductor.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
    // Hay que asignarle nombre con un nuevo servicio
    // this.listaCanciones = this.http.get('https://playstack.azurewebsites.net/get/song/bygenre?NombreGenero=rap&Usuario=Rodolfo');
    // this.playlist = this.rs.recuperarTracks(this.playlist);
    this.listaCanciones = this.rs.recuperarTracks(this.playlist);
    
    this.listaCanciones.subscribe(canciones => {
      console.log(canciones);
      if (JSON.stringify(canciones) === '{}') {
        this.showError = true;
      }
      this.showSpinner = false;
    });
    
  }

  addSong(cancion: any) {
    this.playlist.tracks.push(this.rs.constructTrack(cancion));
    console.log(this.playlist.tracks);
  }

  playSong(indice: number) {
    console.log("Poner cancion", indice);
    // Establece la lista de reproducción del reproductor como las
    // canciones que hay después de la que se pone (incluida).
    this.rs.setPlaylist(this.playlist.tracks.slice(indice));
    this.rs.start(this.playlist.tracks[indice]);
  }

}
