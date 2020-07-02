import { Component } from '@angular/core';
import {Project} from '../../model/project';
import {TokenStorageService} from '../../shared/token-storage.service';

@Component({
  selector: 'app-create-project-dialog',
  templateUrl: './create-project-dialog.component.html',
  styleUrls: ['./create-project-dialog.component.css']
})
export class CreateProjectDialogComponent {

  newProject: Project = {
    id: null,
    titre: 'Nouveau projet',
    desc: 'Décrivez-le',
    dateCrea: null,
    username: this.tokenStorage.getUser(),
    nbTodo: null,
    nbInProgress: null,
    nbTest: null,
    nbDone: null,
    nbValid: null
  };

  constructor(public tokenStorage: TokenStorageService) { }


}
