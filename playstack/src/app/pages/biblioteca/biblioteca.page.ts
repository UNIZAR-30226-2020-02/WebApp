import { Component, OnInit } from '@angular/core';
import { ReproductorService } from '../../services/reproductor.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage implements OnInit {
  currentTab: string;
  constructor(public rs: ReproductorService) {
  }

  ngOnInit() {
    this.currentTab = "Musica";
  }

  setMusic(){
    this.currentTab = "Musica";
  }

  setPodcasts(){
    this.currentTab = "Podcasts";
  }

}
