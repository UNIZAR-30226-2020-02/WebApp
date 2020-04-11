import { Component, OnInit } from '@angular/core';
import { ReproductorService } from '../../services/reproductor.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  constructor(private rs:ReproductorService) { }

  ngOnInit() {
  }

}
