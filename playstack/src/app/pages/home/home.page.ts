import { Component, OnInit } from '@angular/core';
import { ReproductorService } from '../../services/reproductor/reproductor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  
  cancionesRap: Observable<any>;
  cancionesTechno: Observable<any>;

  showSpinner1: boolean = true;
  showSpinner2: boolean = true;



  constructor(public rs: ReproductorService) {
  }

  ngOnInit() {
    this.cancionesRap = this.rs.getCancionesByGenero("Rap");
    this.cancionesRap.subscribe(() => this.showSpinner1 = false);
    this.cancionesTechno = this.rs.getCancionesByGenero("Techno");
    this.cancionesTechno.subscribe(() => this.showSpinner2 = false);
    /*
    this.canciones.subscribe(data => {
      console.log('my data: ', data);
    })
    */
  }

}
