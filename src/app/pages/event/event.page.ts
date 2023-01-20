import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { event } from '../../core/interfaces/event';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  event?: event
  result?: string

  constructor(
    private ar: ActivatedRoute,
    private etService: EventService,
    private actionSheetCtrl: ActionSheetController,
    private navControl: NavController,
    private toastService:ToastService
  ) {
    ar.params.subscribe(param => {
      etService.getEvent(param['id']).then(event => this.event = event)
    })
  }

  ngOnInit() {
  }

  async showModal(i: number) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Mostrar a quien regala',
      subHeader: 'Estas seguro de que quieres ver la informacion?',
      buttons: [
        {
          text: 'Mostrar',
          role: 'Show',
          data: {
            action: 'Show',
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
    if (result.role === 'cancel') return;
    if (result.role === 'Show') {
      this.event!.participants[i].show = !this.event?.participants[i].show
    }
  }

  back() {
    this.navControl.navigateBack('')
  }

  async modalDelete() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Eliminar evento',
      subHeader: 'Estas seguro de que quieres eliminar este evento?',
      buttons: [
        {
          text: 'Eliminar',
          role: 'delete',
          data: {
            action: 'delete',
          },
        }
        ,
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
    if (result.role === 'cancel') return;
    if (result.role === 'delete') {
      this.etService.deleteEvent(this.event!.id!)
    }
    this.toastService.presentToast('Evento borrado con exito')
    this.back()
  }

  async modalReRaffle() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Re sortear evento',
      subHeader: 'Estas seguro de que quieres re sortear este evento?',
      buttons: [
        {
          text: 'Re Sortear',
          role: 'reRaffle',
          data: {
            action: 'reRaffle',
          },
        }
        ,
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
    if (result.role === 'cancel') return;
    if (result.role === 'reRaffle') {
      const newEvent = this.etService.raffleEvent(this.event!)
      this.etService.editEven(newEvent)
    }
    this.toastService.presentToast('Evento sorteado con exito')
  }

  async modalFinished() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Cambiando etado del evento',
      subHeader: this.event!.finalized ? 'Desea restaurar el evento?' : 'Desea fianlizar y bloquear este evento?',
      buttons: [
        {
          text: this.event!.finalized ? 'Restaurar evento' : 'Terminar evento',
          role: 'change',
          data: {
            action: 'change',
          },
        }
        ,
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2);
    if (result.role === 'cancel') return;
    if (result.role === 'change') {
      this.event!.finalized = !this.event!.finalized 
      this.etService.editEven(this.event!)
    }
    this.toastService.presentToast( this.event!.finalized ? 'Evento Finalizado con exito' : 'Evento restaurado') 
    if(this.event!.finalized){
      
      this.back()
    } 
  }

}

