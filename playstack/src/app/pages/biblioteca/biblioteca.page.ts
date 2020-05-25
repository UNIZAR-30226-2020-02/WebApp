import { Component, OnInit } from '@angular/core';
import { ReproductorService, Episodio } from '../../services/reproductor/reproductor.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ContenidoService } from 'src/app/services/contenido/contenido.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.page.html',
  styleUrls: ['./biblioteca.page.scss'],
})
export class BibliotecaPage implements OnInit {
  currentTab: string;
  currentTabMusica: string;
  currentTabPodcasts: string;

  playlists: Observable<any>;
  artistas: Observable<any>;
  albumes: Observable<any>;
  podcasts: Observable<any>;

  pod: any;

  informacionPodcast: Episodio[] = [];

  showSpinner: boolean = false;
  showError: boolean = true;
  mensajeError: string = "";
  firstTime: boolean = true;


  constructor(public rs: ReproductorService, public cs: ContenidoService, public http: HttpClient,
    private router: Router, private activatedRoute: ActivatedRoute, public alertController: AlertController) {
  }

  ngOnInit() {
    this.currentTab = "Musica";
    this.setPlaylists();
  }

  ionViewWillEnter(){
    this.playlists = this.cs.getUserPlaylists();
  }

  setMusic() {
    this.currentTab = "Musica";
  }

  setPodcasts() {
    this.currentTab = "Podcasts";
    if (this.firstTime) {
      this.firstTime = false;
      this.setEpisodios();
    }
  }


  setPlaylists() {
    this.currentTabMusica = "Playlists";
    this.showSpinner = true;
    this.showError = false;
    // Recuperar las playlists
    this.playlists = this.cs.getUserPlaylists();
    this.playlists.subscribe(
      resultado => {
        console.log(resultado);
        this.showSpinner = false;
      },
      error => {
        this.showSpinner = false;
        this.mensajeError = "No hay playlists"
        this.showError = true;
      });
  }

  setArtistas() {
    this.currentTabMusica = "Artistas";
    this.showSpinner = true;
    this.showError = false;
    // Recuperar artistas
    this.artistas = this.cs.getArtistas();
    this.artistas.subscribe(
      resultado => {
        this.showSpinner = false;
      },
      error => {
        this.showSpinner = false;
        this.mensajeError = "No hay artistas"
        this.showError = true;
      });
  }

  setAlbumes() {
    this.currentTabMusica = "Albumes";
    this.showSpinner = true;
    this.showError = false;
    // Recuperar albumes
    this.albumes = this.cs.getRandomAbums();
    this.albumes.subscribe(
      resultado => {
        this.showSpinner = false;
      },
      error => {
        this.showSpinner = false;
        this.mensajeError = "No hay albumes"
        this.showError = true;
      });
  }

  setProgramas() {
    this.currentTabPodcasts = "Programas";
    this.showSpinner = true;
    this.showError = false;

    // Recuperar podcasts
    this.podcasts = this.cs.getPodcastsFollowed();
    this.podcasts.subscribe(
      resultado => {
        this.showSpinner = false;
      },
      error => {
        this.showSpinner = false;
        this.mensajeError = "No hay podcasts"
        this.showError = true;
      });
  }

  setEpisodios() {
    this.currentTabPodcasts = "Episodios";
    this.showSpinner = true;
    this.showError = false;

    // Recuperar episodios
    this.pod = this.cs.getInformacionPodcast("Speak English now");
    this.pod.subscribe(
      resultado => {
        this.showSpinner = false;
        console.log(resultado);
        if (this.isEmpty(resultado)) {
          this.showError = true;
        }
        else {
          console.log(resultado);
          this.pod = resultado;
          this.pod.capitulos.forEach(episodio => {
            this.informacionPodcast.push(new Episodio(episodio.nombre, episodio.url, episodio.numChapter,
              episodio.fecha.substring(0, 10), this.pod.Foto, "Speak English now", this.pod.Interlocutores));
          });
        }
      },
      error => {
        this.showSpinner = false;
        this.showError = true;
      });
  }

  openPlaylist(nombre: string, esPrivada: boolean, covers: string[]) {
    // Mirar si ha cambiado el estado de privacidad
    this.cs.getUserPlaylists().subscribe(
      resultado => {
        esPrivada = resultado[nombre].Privado;

        let playlist = this.cs.constructPlaylist("Playlist", esPrivada, nombre, covers, []);
        // Abrir pantalla de visualización de playlist pasando a la página el objeto que contiene la playlist
        let navigationExtras: NavigationExtras = {
          relativeTo: this.activatedRoute,
          state: {
            playlist: playlist
          }
        };
        console.log(this.activatedRoute);
        this.router.navigate(['../../playlist'], navigationExtras);
      }
    )
  }

  openFavoritas(nombre: string, esPrivada: boolean, covers: string[]) {
    let playlist = this.cs.constructPlaylist("Favoritas", esPrivada, nombre, covers, []);
    // Abrir pantalla de visualización de playlist pasando a la página el objeto que contiene la playlist
    let navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      state: {
        playlist: playlist
      }
    };
    console.log(this.activatedRoute);
    this.router.navigate(['../../playlist'], navigationExtras);
  }

  openArtist(artista: string, foto: string) {
    let navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      state: {
        nombreArtista: artista,
        image: foto,
      }
    };
    console.log(this.activatedRoute);
    this.router.navigate(['../../artista'], navigationExtras);
  }

  openAlbum(nombre: string, cover: string) {
    let playlist = this.cs.constructPlaylist("Album", false, nombre, [cover], []);
    // Abrir pantalla de visualización de playlist pasando a la página el objeto que contiene la playlist
    let navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      state: {
        playlist: playlist
      }
    };
    console.log(this.activatedRoute);
    this.router.navigate(['../../playlist'], navigationExtras);
  }

  openPodcast(pod: any) {
    // Abrir pantalla de visualización de playlist pasando a la página el objeto que contiene la playlist
    let navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      state: {
        podcast: pod
      }
    };
    console.log(this.activatedRoute);
    this.router.navigate(['../../podcast'], navigationExtras);
  }

  mostrarInterlocutores(interlocutores: any) {
    let inter: string[] = [];
    interlocutores.forEach(elemento => {
      for (let informacion in elemento) {
        inter.push(informacion);
      }
    });
    return inter.join(', ');
  }
  private isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  /* Esto es para una ventana emergente para crear la playlist */
  /*async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPage
    });
    return await modal.present();
  }*/
  playChapter(capitulo: number) {
    // Establece la lista de reproducción del reproductor como las
    // canciones que hay después de la que se pone (incluida).
    console.log("play", capitulo);
  }


  async crearPlaylist() {

    const alert = await this.alertController.create({
      header: 'Crear playlist',
      message: 'Introduce un nombre para tu playlist',
      inputs: [
        {
          name: 'nombrePlaylist',
          type: 'text',
          placeholder: 'Nombre'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Aceptar',
          handler: async (data) => {
            console.log('Confirm Okay');
            if (data.nombrePlaylist == undefined) {
              this.errorNombrePlaylist();
            } else {
              let respuesta = await this.cs.crearPlaylist(data.nombrePlaylist, true);
              switch (respuesta) {
                case 200: this.setPlaylists(); break;
                default: console.log("error creando la playlist"); break;
              }
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async errorNombrePlaylist() {
    const alert = await this.alertController.create({
      header: 'Error al crear la playlist',
      message: 'No has introducido un nombre para la playlist',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }
}
