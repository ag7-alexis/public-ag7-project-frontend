import {Component, Input, OnInit} from '@angular/core';
import {Test} from '../../../model/todo/test';
import {TodoComponent} from '../../todo.component';

@Component({
  selector: 'app-simple-test',
  templateUrl: './simple-test.component.html',
  styleUrls: ['./simple-test.component.css']
})
export class SimpleTestComponent implements OnInit {

  @Input() leTest: Test;

  constructor(private todoComponent: TodoComponent) {
  }

  ngOnInit() {
  }

}
