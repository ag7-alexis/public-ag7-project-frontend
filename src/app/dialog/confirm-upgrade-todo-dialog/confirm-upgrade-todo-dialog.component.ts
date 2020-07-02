import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DialogUpgradeTodoData} from '../../todo/todo.component';

@Component({
  selector: 'app-confirm-upgrade-todo-dialog',
  templateUrl: './confirm-upgrade-todo-dialog.component.html',
  styleUrls: ['./confirm-upgrade-todo-dialog.component.css']
})
export class ConfirmUpgradeTodoDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogUpgradeTodoData) {
  }


}
