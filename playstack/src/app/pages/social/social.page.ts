import { Component, OnInit } from '@angular/core';
import { SocialService } from 'src/app/services/social/social.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.page.html',
  styleUrls: ['./social.page.scss'],
})
export class SocialPage implements OnInit {
  currentTab: string;

  siguiendo: string[] = [];
  seguidores: string[] = [];
  sollicitudes: string[] = [];

  constructor(private social: SocialService) { }

  ngOnInit() {
    this.setSiguiendo()
  }

  setSiguiendo() {
    this.currentTab = "Siguiendo";
  }

  setSeguidores() {
    this.currentTab = "Seguidores";
  }

  setSolicitudes() {
    this.currentTab = "Solicitudes";
  }

  setBuscar() {
    this.currentTab = "Buscar";
  }


}
