import { Component, OnInit } from '@angular/core';
import { ReproductorService } from '../../services/reproductor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  
  cancionesRap: Observable<any>;
  cancionesTechno: Observable<any>;


  constructor(public rs: ReproductorService) {
  }

  ngOnInit() {
    this.cancionesRap = this.rs.getCancionesByGenero("Rap");
    this.cancionesTechno = this.rs.getCancionesByGenero("Techno");


    /*
    this.canciones.subscribe(data => {
      console.log('my data: ', data);
    })
    */

  }

}
