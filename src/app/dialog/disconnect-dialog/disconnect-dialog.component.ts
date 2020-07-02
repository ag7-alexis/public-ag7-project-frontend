import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {TokenStorageService} from '../../shared/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-disconnect-dialog',
  templateUrl: './disconnect-dialog.component.html',
  styleUrls: ['./disconnect-dialog.component.css']
})
export class DisconnectDialogComponent {

  constructor(public dialog: MatDialogRef<DisconnectDialogComponent>, public tokenStorage: TokenStorageService, public route: Router) {
  }


  signOut(): void {
    this.tokenStorage.signOut();
    this.route.navigateByUrl('/home');
    this.dialog.close();
  }

}
