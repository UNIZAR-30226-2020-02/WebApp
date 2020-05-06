import { Component, OnInit, ViewChild } from '@angular/core';
import { ReproductorService } from '../../services/reproductor/reproductor.service';

import { IonRange } from '@ionic/angular';



@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.scss'],
})
export class ReproductorComponent implements OnInit {
  @ViewChild('range', {static: false}) range: IonRange;


  constructor(public rs: ReproductorService) { }
  
  seek()
  {
    let newValue = +this.range.value;
    let duration = this.rs.player.duration();
    this.rs.player.seek(duration * (newValue / 100));
  }

  ngOnInit() {}

}
