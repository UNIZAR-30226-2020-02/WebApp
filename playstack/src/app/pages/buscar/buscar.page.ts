import { Component, OnInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { ReproductorService } from '../../services/reproductor/reproductor.service';
import { IonSearchbar, IonList, IonItem } from '@ionic/angular';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  constructor(private rs:ReproductorService) { }

  @ViewChild(IonSearchbar, {static: true}) searchbar: IonSearchbar ;
  @ViewChildren(IonItem) items: IonList;

  ngOnInit() {
  
    //this.searchbar.addEventListener('ionInput', this.handleInput);
  }


  handleInput(event) {
    /*
    const query = event.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.items.forEach(item => {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item.style.display = shouldShow ? 'block' : 'none';
      });
    });
    */
  }

}
