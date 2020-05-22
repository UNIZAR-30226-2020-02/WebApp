import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private route: ActivatedRoute, private router: Router, private nombreArtista: string,
      private rs: ReproductorService) { }

  ngOnInit() {
    this.canciones = this.rs.getCancionesByArtista(this.nombreArtista);
    this.albumes = this.rs.getArtistaAlbums(this.nombreArtista);
  }

}
