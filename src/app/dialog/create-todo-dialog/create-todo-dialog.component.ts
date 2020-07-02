import {Component, Inject, OnInit} from '@angular/core';
import {Todo} from '../../model/todo/todo';
import {TokenStorageService} from '../../shared/token-storage.service';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DialogCreateTodoData} from '../../todo/todo.component';

@Component({
  selector: 'app-create-todo-dialog',
  templateUrl: './create-todo-dialog.component.html',
  styleUrls: ['./create-todo-dialog.component.css']
})
export class CreateTodoDialogComponent {

  newTodo: Todo = {
    id: null,
    desc: 'Nouveau To Do !',
    difficulty: 'Easy',
    username: this.tokenStorage.getUser(),
    projectId: this.data.idProject,
    stateId: '1'
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogCreateTodoData, public tokenStorage: TokenStorageService) {
  }


}
