import { Injectable } from '@angular/core';
import { event } from '../interfaces/event';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private storage: StorageService) { }

  // async getEvents(filter: 'slope' | 'finished' | 'all' = 'slope'): Promise<event[]> {
    async getEvents(): Promise<event[]> {
    return await this.storage.get('eventos') || []
    // switch (filter) {
    //   case 'slope':
    //     return events.filter((event: event) =>  event.finalized !== true)

    //   case 'finished':
    //     return events.filter((event: event) =>  event.finalized === true)

    //   case 'all':
    //     return events

    //   default:
    //     return events;
    // }
  }

  async getEvent(id: number) {
    const events = await this.getEvents()
    return events.find(event => event.id == id)
  }

  async setNewEvent(event: event) {
    const newEvent: event = event
    let events = await this.getEvents() || []
    if (events.length === 0) {
      newEvent.id = 1
    }
    else {
      newEvent.id = events[events.length - 1].id! + 1
    }
    events.push(event)
    this.storage.set('eventos', events)
    return newEvent.id
  }

  raffleEvent(event: event): event {
    const newEvent = event
    let participantsAvailable: string[] = []
    event.participants.forEach((participant, i) => {
      if (participant.name === '') {
        newEvent.participants.splice(i, 1)
        participantsAvailable.push(event.participants[i].name)
      }
      else {
        participantsAvailable.push(participant.name)
      }
    })
    newEvent.participants.forEach((participant) => {
      let positionRandom: number | undefined
      do {
        positionRandom = Math.floor(Math.random() * participantsAvailable.length)
      }
      while (participant.name === participantsAvailable[positionRandom])
      participant.gift = participantsAvailable[positionRandom]
      participantsAvailable.splice(positionRandom, 1)
    })
    return newEvent
  }

  async editEven(editevent: event) {
    const events = await this.getEvents()
    const newEvents = events.filter(event => event.id != editevent.id)
    newEvents.forEach(event => {
      event.participants.forEach(participant => participant.show == false)
    })
    editevent.participants.forEach(participant => participant.show = false)
    newEvents.push(editevent)
    newEvents.sort((a, b) => a.id! - b.id!)
    this.storage.set('eventos', newEvents)
  }

  async deleteEvent(id: number) {
    const events = await this.storage.get('eventos')
    const newEvents = events.filter((event: event) => event.id != id)
    this.storage.set('eventos', newEvents)
  }

}
