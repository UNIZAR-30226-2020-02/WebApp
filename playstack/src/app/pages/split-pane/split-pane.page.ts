import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


//TODO creo que hay que poner aqui lo de routes con las cosas 

@Component({
  selector: 'app-tabs',
  templateUrl: './split-pane.page.html',
  styleUrls: ['./split-pane.page.scss'],
})
export class SplitPanePage implements OnInit {

  constructor(private router: Router) { }

    ngOnInit() {
    }

    open(id: string) {
      this.router.navigateByUrl('/' + id);
    }

}
