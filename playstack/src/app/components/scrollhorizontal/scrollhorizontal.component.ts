import { Component, OnInit, Input } from '@angular/core';
import { ReproductorService } from '../../services/reproductor/reproductor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-scrollhorizontal',
  templateUrl: './scrollhorizontal.component.html',
  styleUrls: ['./scrollhorizontal.component.scss'],
})
export class ScrollhorizontalComponent implements OnInit {

  @Input()
  listaCanciones: Observable<any>;

  constructor(public rs: ReproductorService) { }

  ngOnInit() {}

}
