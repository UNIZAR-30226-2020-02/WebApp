import { ContenidoService } from 'src/app/services/contenido/contenido.service';
import { Component, OnInit, Input } from '@angular/core';
import { ReproductorService, Podcast } from 'src/app/services/reproductor/reproductor.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.page.html',
  styleUrls: ['./podcast.page.scss'],
})
export class PodcastPage implements OnInit {
  podcast: any; // Falta por hacer una clase podcast
  @Input()
  listaCapitulos: Observable<any>;

  showSpinner: boolean = false;
  showError : boolean = true;

  constructor(private rs: ReproductorService, private http: HttpClient, private cs: ContenidoService,
    private route: ActivatedRoute, private router: Router) { 
      this.route.queryParams.subscribe(() => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.podcast = this.router.getCurrentNavigation().extras.state.podcast;
        }
      });
    }

  ngOnInit() {
    this.listaCapitulos = this.cs.getEpisodios(this.podcast.key);
    this.cargarCapitulos();
  }

  cargarCapitulos() {
    this.listaCapitulos.subscribe(
      capitulos => {
        this.showSpinner = false;
        if (this.isEmpty(capitulos)) {
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

  playChapter(capitulo: any) {
    // Establece la lista de reproducción del reproductor como las
    // canciones que hay después de la que se pone (incluida).
    this.rs.setListaAudio(this.podcast.capitulos);
    this.rs.start(capitulo);
  }
}
