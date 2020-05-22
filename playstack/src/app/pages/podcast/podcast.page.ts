import { Component, OnInit, Input } from '@angular/core';
import { ReproductorService } from 'src/app/services/reproductor/reproductor.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.page.html',
  styleUrls: ['./podcast.page.scss'],
})
export class PodcastPage implements OnInit {
  podcast: Podcast; // Falta por hacer una clase podcast
  @Input()
  listaCapitulos: Observable<any>;

  constructor(private rs: ReproductorService, private http: HttpClient,
    private route: ActivatedRoute, private router: Router) { 
      this.route.queryParams.subscribe(() => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.podcast = this.router.getCurrentNavigation().extras.state.podcast;
        }
      });
    }

  ngOnInit() {
    this.listaCapitulos = this.rs.recuperarTracks(this.podcast);
    this.cargarCapitulos();
  }

}
