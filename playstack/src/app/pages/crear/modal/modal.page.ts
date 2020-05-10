import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  nombreLista: string;

  constructor(private modalCtrl: ModalController, private http: HttpClient) { }

  ngOnInit() {
  }

  dismiss() : void{
    this.modalCtrl.dismiss();
  }

  async crearLista(){
    const httpOptions={
      headers : new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let postParams = {"NombreUsuario": "Rodolfo", "NombrePlaylist": this.nombreLista};
    let response = await this.http.post("https://playstack.azurewebsites.net/user/login", postParams, httpOptions)
  }
}
