import { Component, OnInit } from '@angular/core';
import { ReproductorService } from '../../services/reproductor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  //He tecleado mal al crear el modulo, por lo que es REPRODUTOR, sin c, lo sé, soy muy listo
  // El servicio está bien escrito y es reproduCtor

  constructor(private rs: ReproductorService) {
  }

  ngOnInit() {
  }

}
