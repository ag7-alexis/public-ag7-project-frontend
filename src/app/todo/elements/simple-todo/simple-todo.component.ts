import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../../../model/todo/todo';
import {TodoComponent} from '../../todo.component';

@Component({
  selector: 'app-simple-todo',
  templateUrl: './simple-todo.component.html',
  styleUrls: ['./simple-todo.component.css']
})
export class SimpleTodoComponent implements OnInit {
  editActive = false;

  @Input() leTodo: Todo;

  constructor(private todoComponent: TodoComponent) {
  }

  ngOnInit() {
  }

  ActiveEdit(id: string) {
    if (this.editActive === false) {
      document.getElementById('desc-' + id).removeAttribute('disabled');
      document.getElementById('difficulty-' + id).removeAttribute('disabled');
    } else {
      document.getElementById('desc-' + id).setAttribute('disabled', '1');
      document.getElementById('difficulty-' + id).setAttribute('disabled', '1');
    }
    this.editActive = !this.editActive;
  }

}
