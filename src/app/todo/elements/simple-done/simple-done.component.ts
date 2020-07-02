import {Component, Input, OnInit, Renderer} from '@angular/core';
import {Done} from '../../../model/todo/done';
import {TodoComponent} from '../../todo.component';

@Component({
  selector: 'app-simple-done',
  templateUrl: './simple-done.component.html',
  styleUrls: ['./simple-done.component.css']
})
export class SimpleDoneComponent implements OnInit {

  @Input() leDone: Done;

  constructor(private todoComponent: TodoComponent) {
  }

  ngOnInit() {
  }


}
