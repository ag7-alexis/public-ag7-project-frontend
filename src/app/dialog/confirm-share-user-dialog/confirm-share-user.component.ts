import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DialogConfirmShareUserData} from '../../project/project.component';

@Component({
  selector: 'app-confirm-share-user',
  templateUrl: './confirm-share-user.component.html',
  styleUrls: ['./confirm-share-user.component.css']
})
export class ConfirmShareUserComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogConfirmShareUserData) { }

}
