import { Component } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { event } from '../core/interfaces/event';
import { EventService } from '../core/services/event.service';
import { howLongFromPastDate } from '../core/helpes/time';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements ViewWillEnter {

  events?: event[]
  filter: 'slope' | 'finished' | 'all' = 'slope'

  constructor(private et: EventService) {
  }

  ionViewWillEnter(): void {
    this.getEvents()
  }

  getEvents() {
    this.et.getEvents().then(events => {
      this.events = events ? events : []
    })
  }

  getDayEvent(date:Date){
    return howLongFromPastDate(date)
  }






}
