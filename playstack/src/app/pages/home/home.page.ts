import { Component, OnInit } from '@angular/core';
import { ReproductorService } from '../../services/reproductor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  
  constructor(public rs: ReproductorService) {
  }

  ngOnInit() {
  }

}
