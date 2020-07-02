import {Component, Input, OnInit} from '@angular/core';
import {Valid} from '../../../model/todo/valid';
import {TodoComponent} from '../../todo.component';

@Component({
  selector: 'app-simple-valid',
  templateUrl: './simple-valid.component.html',
  styleUrls: ['./simple-valid.component.css']
})
export class SimpleValidComponent implements OnInit {

  @Input() leValid: Valid;

  constructor(private todoComponent: TodoComponent) {
  }

  ngOnInit() {
    console.log(this.leValid);
    console.log(this.getIntervalleDate(new Date(this.leValid.dateDebInPr), new Date(this.leValid.dateFinDone)));
  }


  getIntervalleDate(dateD, dateF) {
    let dateDeb: Date;
    let dateFin: Date;
    dateDeb = new Date(dateD);
    dateFin = new Date(dateF);
    let diff: number;
    diff = dateFin.getTime() - dateDeb.getTime();
    const days = Math.floor(diff / (60 * 60 * 24 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
    const minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
    const seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
    return {day: days, hour: hours, minute: minutes, second: seconds};
  }
}
