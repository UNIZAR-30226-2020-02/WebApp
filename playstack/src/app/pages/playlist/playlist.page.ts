import { Component, OnInit, Input } from '@angular/core';
import { ReproductorService } from 'src/app/services/reproductor.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {
  name: String = "Playlist de Prueba";
  @Input()
  listaCanciones: Observable<any>;
  constructor(public rs: ReproductorService, public http: HttpClient) { 
  }

  ngOnInit() {
    // Hay que asignarle nombre con un nuevo servicio
    this.listaCanciones = this.http.get('https://playstack.azurewebsites.net/get/song/bygenre?NombreGenero=rap&Usuario=Rodolfo');
  }

}
