import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creador-contenido',
  templateUrl: './creador-contenido.page.html',
  styleUrls: ['./creador-contenido.page.scss'],
})
export class CreadorContenidoPage implements OnInit {
  currentTab: string;
  constructor() { }

  ngOnInit() {
    this.currentTab = "Musica";
  }
  setPodcasts() {
    this.currentTab = "Podcasts";
  }
  setMusic() {
    this.currentTab = "Musica";
  }
}
