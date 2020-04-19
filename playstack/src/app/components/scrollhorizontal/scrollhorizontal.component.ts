import { Component, OnInit } from '@angular/core';
import { ReproductorService } from '../../services/reproductor.service';

@Component({
  selector: 'app-scrollhorizontal',
  templateUrl: './scrollhorizontal.component.html',
  styleUrls: ['./scrollhorizontal.component.scss'],
})
export class ScrollhorizontalComponent implements OnInit {

  constructor(public rs: ReproductorService) { }

  ngOnInit() {}

}
