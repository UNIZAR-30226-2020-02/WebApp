import { Component, OnInit, ViewChild } from '@angular/core';
import { ReproductorService } from '../../services/reproductor.service';

import { Howl } from 'howler';
import { hostViewClassName } from '@angular/compiler';
import { IonRange } from '@ionic/angular';



@Component({
  selector: 'app-reprodutor',
  templateUrl: './reprodutor.component.html',
  styleUrls: ['./reprodutor.component.scss'],
})
export class ReprodutorComponent implements OnInit {
  @ViewChild('range', {static: false}) range: IonRange;
  constructor(private rs: ReproductorService) { }
  
  seek()
  {
    let newValue = +this.range.value;
    let duration = this.rs.player.duration();
    this.rs.player.seek(duration * (newValue / 100));
  }

  ngOnInit() {}

}
