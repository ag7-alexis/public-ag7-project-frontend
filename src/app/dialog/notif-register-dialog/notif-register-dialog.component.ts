import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-notif-register-dialog',
  templateUrl: './notif-register-dialog.component.html',
  styleUrls: ['./notif-register-dialog.component.css']
})
export class NotifRegisterDialogComponent {

  constructor(public dialog: MatDialogRef<NotifRegisterDialogComponent>) {
  }

  close() {
    this.dialog.close();
  }
}
