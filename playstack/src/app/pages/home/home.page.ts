import { Component, OnInit } from '@angular/core';
import { ReproductorService } from '../../services/reproductor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  
  canciones: Observable<any>;

  constructor(public rs: ReproductorService) {
  }

  ngOnInit() {
    this.canciones = this.rs.getListaCanciones();
    
    console.log(this.canciones);

    /*
    this.canciones.subscribe(data => {
      console.log('my data: ', data);
    })
    */

  }

}
