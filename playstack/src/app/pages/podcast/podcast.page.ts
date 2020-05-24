import { IonicModule } from '@ionic/angular';
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
  nombrePodcast: string;

  podcast: Promise<any>;
  infoPodcast: any;

  showSpinner: boolean = false;
  showError: boolean = false;
  mensajeError: string = "No hay episodios";

  constructor(private rs: ReproductorService, private http: HttpClient, private cs: ContenidoService,
    private route: ActivatedRoute, private router: Router) { 
      this.route.queryParams.subscribe(() => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.nombrePodcast = this.router.getCurrentNavigation().extras.state.podcast;
        }
      });
    }

  async ngOnInit() {
    this.podcast = this.cs.getInformacionPodcast(this.nombrePodcast).toPromise();

    waits this.podcast.then(
      informacion => {
        this.showSpinner = false;
        this.infoPodcast = informacion;
        if (this.infoPodcast.capitulos == []) {
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

  /*
  addChapter(cancion: any, indice: number) {
    if (this.podcast.tracks[indice] === undefined) {
      this.playlist.tracks[indice] = this.c.constructTrack(cancion);
      console.log(this.playlist.tracks);
    }
  }

  playChapter(capitulo: any) {
    // Establece la lista de reproducción del reproductor como las
    // canciones que hay después de la que se pone (incluida).
    this.rs.setListaAudio(this.podcast.capitulos);
    this.rs.start(capitulo);
  }
  */
}
