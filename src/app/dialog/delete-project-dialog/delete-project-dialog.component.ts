import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogDeleteProjectData} from '../../project/project.component';

@Component({
  selector: 'app-delete-project-dialog',
  templateUrl: './delete-project-dialog.component.html',
  styleUrls: ['./delete-project-dialog.component.css']
})
export class DeleteProjectDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDeleteProjectData) {
  }


}
