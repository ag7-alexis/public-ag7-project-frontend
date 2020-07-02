import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../model/project';
import {ProjectComponent} from '../../project.component';

@Component({
  selector: 'app-simple-project',
  templateUrl: './simple-project.component.html',
  styleUrls: ['./simple-project.component.css']
})
export class SimpleProjectComponent implements OnInit {

  @Input() leProjet: Project;

  constructor(private projectComponent: ProjectComponent) {
  }

  ngOnInit() {
  }

  public selectProject(project: Project) {
    this.projectComponent.activeProject = project;
    this.projectComponent.getUserShared(project);
  }


}
