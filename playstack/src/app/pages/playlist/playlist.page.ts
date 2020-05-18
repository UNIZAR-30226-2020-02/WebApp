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
    }

}
