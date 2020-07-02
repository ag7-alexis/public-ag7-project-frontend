import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../shared/token-storage.service';
import {MatDialog} from '@angular/material/dialog';
import {DisconnectDialogComponent} from '../dialog/disconnect-dialog/disconnect-dialog.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isShowNavMobile = false;

  constructor(public tokenStorage: TokenStorageService, public dialog: MatDialog) {
  }

  ngOnInit() {

  }

  dialogDisconnect() {
    const dialogRef = this.dialog.open(DisconnectDialogComponent, {
      width: '30rem'
    });
    dialogRef.afterClosed().subscribe(res => {
      }
    );
  }


  getNavMobile() {
    this.isShowNavMobile = !this.isShowNavMobile;
    if (this.isShowNavMobile === true) {
      document.getElementById('navbarColor01').style.display = 'block';
    } else {
      document.getElementById('navbarColor01').style.display = 'none';
    }
  }

}
