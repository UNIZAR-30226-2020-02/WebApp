import { Episodio } from './../../services/reproductor/reproductor.service';
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
  @Input()
  podcast: any;

  datosPodcast: any;

  showSpinner: boolean = true;
  showError: boolean = false;
  mensajeError: string = "No hay podcasts"

  listaEpisodios: Episodio[] = []

  constructor(private rs: ReproductorService, private http: HttpClient, private cs: ContenidoService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.podcast = this.router.getCurrentNavigation().extras.state.podcast;

        this.cs.getInformacionPodcast(this.podcast.key).subscribe(
          resultado => {
            this.showSpinner = false;
            console.log(resultado);
            if (this.isEmpty(resultado)) {
              this.showError = true;
            }
            else {
              this.datosPodcast = resultado;
              this.cargarEpisodios();
            }
          },
          error => {
            this.showSpinner = false;
            this.showError = true;
          }
        );
      }
    });
  }

  cargarEpisodios() {
    this.datosPodcast.capitulos.forEach(episodio => {
      this.listaEpisodios.push(new Episodio(episodio.nombre, episodio.url, episodio.numChapter,
        episodio.fecha.substring(0, 10)));
    });
  }

  private isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  playChapter(indice: number) {
    // Establece la lista de reproducción del reproductor como las
    // canciones que hay después de la que se pone (incluida).
    this.rs.setListaAudio(this.listaEpisodios);
    this.rs.start(this.listaEpisodios[indice]);
  }
}