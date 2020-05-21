import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  correoUsuario: string;
  nombreUsuario: string;
  constructor(private info : UserInfoService, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.nombreUsuario = this.router.getCurrentNavigation().extras.state.usuario;
      }
    });  }

  ngOnInit() {
    /* FALTA las canciones, generos y ultimas canciones más escuchados en la BD */
    // Obtener correo del usuario desde la BD
    let wasd = this.info.getUserInfo(this.nombreUsuario);
    wasd.subscribe(value => {
      this.correoUsuario = value["Correo"];
      console.log(this.correoUsuario);
    });
  }

}
