import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // @ViewChild('Slides', {static: false}) slides: IonSlides;

  url = 'https://spreadsheets.google.com/feeds/list/1wlq5rZEfXLtSDsAEvPAur9Oos0zBK3MVm3fODGppQUA/od6/public/values?alt=json';
  frases: any =  [];
  frase = '';
  fonte = '';

  constructor() {}

  ngOnInit() {
    const options = { method: 'GET' };
    fetch(this.url, options)
      .then(response => {
        return response.json();
    })
    .then(data => {
      this.frases = data.feed.entry;
      console.log(this.frases);
      this.frase = this.frases[Math.floor((Date.now() / 86400000) % this.frases.length)].gsx$post.$t;
      this.fonte = this.frases[Math.floor((Date.now() / 86400000) % this.frases.length)].gsx$fonte.$t;
      // this.slides.slideTo(Math.floor((Date.now() / 86400) % this.frases.length));
    });
    if (Notification.permission !== "granted") {
      Notification.requestPermission().then(() => this.notificarFrase());
    } else {
      this.notificarFrase();
    }
  }
notificarFrase() {
   const notification = new Notification('AlfabetizaJunto tem uma nova informação para você')
  }
}