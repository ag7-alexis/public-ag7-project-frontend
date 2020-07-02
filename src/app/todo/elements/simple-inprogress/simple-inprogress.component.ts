import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../../../model/todo/todo';
import {Inprogress} from '../../../model/todo/inprogress';
import {TodoComponent} from '../../todo.component';

@Component({
  selector: 'app-simple-inprogress',
  templateUrl: './simple-inprogress.component.html',
  styleUrls: ['./simple-inprogress.component.css']
})
export class SimpleInprogressComponent implements OnInit {

  @Input() leInprogress: Inprogress;

  constructor(private todoComponent: TodoComponent) { }

  ngOnInit() {
  }

}
