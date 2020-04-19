import { Injectable } from '@angular/core';
import { Howl } from 'howler';
import {HttpClient} from '@angular/common/http';

export interface Track {
  name : string;
  path : string;
  cover: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReproductorService {

  playlist: Track[] = [
    {
      name: 'TestSong',
      path: './assets/mp3/TestSong.mp3',
      cover: './assets/icon/playstack-icon.png'
    },
    {
      name: 'TestSong_2',
      path: './assets/mp3/TestSong_2.mp3',
      cover: './assets/icon/wildworld.jpg'
    },
    {
      name: 'TestOGG',
      path: './assets/mp3/TestOGG.ogg',
      cover: './assets/icon/vlc.png'
    }
  ]
  
  activeTrack: Track = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;

  constructor(private http: HttpClient) { }

  start(track: Track)
  {
    if(this.player)
    {
      this.player.stop();
    }
    this.player = new Howl({
      src: [track.path],
      html5: true,
      onplay: () => {
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress();
      },
      onend: () => {
      }
    });
    this.player.play();
  }

  togglePlayer(pause)
  {
    this.isPlaying = !pause;
    if(pause)
    {
      this.player.pause();
    }
    else
    {
      this.player.play();
    }
  }

  next()
  {
    let index = this.playlist.indexOf(this.activeTrack);
    if(index != this.playlist.length - 1)
    {
      this.start(this.playlist[index + 1]);
    }
    else
    {
      this.start(this.playlist[0]);
    }
  }

  prev()
  {
    let index = this.playlist.indexOf(this.activeTrack);
    if(index > 0)
    {
      this.start(this.playlist[index - 1]);
    }
    else
    {
      this.start(this.playlist[this.playlist.length - 1]);
    }
  }
  
  updateProgress()
  {
    let seek = this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0;
    setTimeout(() => {this.updateProgress();}, 1000)
  }

  getListaCanciones()
  {
    console.log('HOLA ESTOY VIVO');
    console.log(this.http.get('https://playstack.azurewebapps.net/get/song/bygenre?NombreGenero=Copla'));
    return this.http.get('https://playstack.azurewebapps.net/get/song/bygenre?NombreGenero=Copla');
  }

}
