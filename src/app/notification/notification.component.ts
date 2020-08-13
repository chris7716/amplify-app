import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  heading: string;
  content: any;

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
  }

}
