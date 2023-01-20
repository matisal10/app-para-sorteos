import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { personEmpty } from 'src/app/core/interfaces/person';
import { event } from '../../core/interfaces/event';
import { EventService } from '../../core/services/event.service';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
})
export class NewEventPage implements OnInit {

  constructor(private navControl: NavController, private eventS: EventService, private toastService:ToastService, private alertController: AlertController) { }

  today = new Date().toISOString()

  eventAct: event = {
    title: '',
    participants: [
      { ...personEmpty },
      { ...personEmpty },
      { ...personEmpty },
    ],
    deadline: new Date()
  }

  ngOnInit() {
  }

  changeDate(e: any) {
    this.eventAct.deadline = new Date(e.detail.value)
  }

  back() {
    this.navControl.navigateBack('')
  }

  async missParticipants() {
    const alert = await this.alertController.create({
      header: 'Faltan participantes',
      message: 'Un evento debe tener al meno 3 participantes!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async store() {
    const realParticipants = this.eventAct.participants.filter(particpant => particpant.name !== '')
    if(realParticipants.length < 3){
      return this.missParticipants()
    }
    const eventRaffle = this.eventS.raffleEvent(this.eventAct)
    const idevent = await this.eventS.setNewEvent(eventRaffle)
    this.toastService.presentToast('Evento creado con exito')
    this.navControl.navigateForward(['event',idevent])
  }

  addParticipantSpace() {
    this.eventAct.participants.push({ ...personEmpty })
  }

  deleteParticipant(i: number) {
    this.eventAct.participants.splice(i, 1);
  }

}
