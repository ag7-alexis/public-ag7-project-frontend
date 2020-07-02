import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DialogDeleteUserSharedData} from '../../project/project.component';

@Component({
  selector: 'app-delete-shared-user-dialog',
  templateUrl: './delete-shared-user-dialog.component.html',
  styleUrls: ['./delete-shared-user-dialog.component.css']
})
export class DeleteSharedUserDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDeleteUserSharedData) { }

}
