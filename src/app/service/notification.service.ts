import { Injectable } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { NotificationComponent } from '../notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public modalRef: MDBModalRef, public modalService: MDBModalService) { }

  showNotification(message: string, heading: string){
    this.modalRef = this.modalService.show(NotificationComponent, {
      backdrop: false,
      keyboard: true,
      show: false,
      ignoreBackdropClick: false,
      class: 'modal-bottom modal-frame',
      containerClass: 'bottom',
      animated: true,
      data: {
          heading: 'Error',
          content: { heading: heading, description: message}
      }
  });
  }

}
