import {Component, OnInit} from '@angular/core';
import {Project} from '../model/project';
import {ApiService} from '../shared/api.service';
import {TokenStorageService} from '../shared/token-storage.service';
import {User} from '../model/user';
import {MatDialog} from '@angular/material/dialog';
import {DeleteProjectDialogComponent} from '../dialog/delete-project-dialog/delete-project-dialog.component';
import {DeleteSharedUserDialogComponent} from '../dialog/delete-shared-user-dialog/delete-shared-user-dialog.component';
import {ConfirmShareUserComponent} from '../dialog/confirm-share-user-dialog/confirm-share-user.component';
import {MatSnackBar} from '@angular/material';
import {CreateProjectDialogComponent} from '../dialog/create-project-dialog/create-project-dialog.component';
import {Router} from '@angular/router';

export interface DialogDeleteProjectData {
  project: Project;
}

export interface DialogDeleteUserSharedData {
  user: User;
  project: Project;
}

export interface DialogConfirmShareUserData {
  username: string;
  project: Project;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  MyProjects: Project[] = [];
  MyProjectsShared: Project[] = [];
  UsersShared: User[] = [];
  UsersFound: User[] = [];
  public activeProject: Project;
  usernameSearch: string = null;
  ErreurMessage: string = null;
  editActive = false;
  isLoad = 0;
  isSearch = false;

  constructor(private apiService: ApiService, private tokenStorage: TokenStorageService,
              public dialog: MatDialog, public snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
    if (!!this.tokenStorage.getToken()) {
      this.getMyAllProjectsIn();
      this.getMyAllProjectsShared();
    } else {
      this.router.navigateByUrl('/connexion');
    }
  }

  getMyAllProjectsIn() {
    this.apiService.getMyAllProjects(this.tokenStorage.getUser()).subscribe(
      res => {
        if (res.length > 0 && true) {
          this.activeProject = res[0];
          this.getUserShared(res[0]);
        }
        this.MyProjects = res;
        this.isLoad++;
      },
      err => {
        this.ErreurMessage = err;
      }
    );
  }

  getMyAllProjectsShared() {
    this.apiService.getMyAllProjectsShared(this.tokenStorage.getUser()).subscribe(
      res => {
        if (res.length > 0 && true) {
          this.activeProject = res[0];
          this.getUserShared(res[0]);
        }
        this.MyProjectsShared = res;
        this.isLoad++;
      },
      err => {
        this.ErreurMessage = err;
      }
    );
  }

  getProject(id: string) {
    this.apiService.getProject(id).subscribe(
      value => {
        return value;
      },
      error => {
        return null;
      }
    );
  }

  getMyProjectShow(num: string) {
    if (document.getElementById('showMyProject' + num).style.display !== 'block') {
      document.getElementById('showMyProject' + num).style.display = 'block';
      document.getElementById('showMyProject-button' + num).classList.replace('test', 'test2');
    } else {
      document.getElementById('showMyProject' + num).style.display = 'none';
      document.getElementById('showMyProject-button' + num).classList.replace('test2', 'test');
    }
  }


  creatProject(newProject: Project) {
    this.apiService.creatProject(newProject).subscribe(
      res => {
        this.MyProjects.unshift(res);
        this.activeProject = res;
        this.getUserShared(res);
      },
      error => {
        console.log('Erreur lors de la création du projet');
      }
    );
  }


  saveProject(project: Project) {
    this.apiService.updateProject(project).subscribe(
      res => {
      },
      error => {
        console.log('Erreur lors de la modification du projet');
      }
    );
  }

  getUserShared(project: Project) {
    this.apiService.getAllUsersSharedToProject(project.id).subscribe(
      res => {
        this.UsersShared = res;
      },
      error => {
        console.log('Erreur lors du chargements des utilisateurs partagés');
      }
    );
  }

  searchUsers(username: string) {
    if (username !== '') {
      this.apiService.getPotentialUsers(username).subscribe(
        res => {
          this.UsersFound = res;
          this.isSearch = true;
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  ShareProject(username: string, selectedProject: Project) {
    this.apiService.shareProject(username, selectedProject).subscribe(
      res => {
        this.UsersShared.unshift(res);
      },
      error => {
        const err = JSON.parse(JSON.stringify(error));
        if (err.error.message === 'user shared = owner') {
          this.snackBar.open('Vous êtes le créateur', 'Ok', {duration: 3500});
        } else if (err.error.message === 'user allready shared') {
          this.snackBar.open('Utilisateur déjà partagé', 'Ok', {duration: 3500});
        } else {
          this.snackBar.open('Erreur lors du partage', 'Ok', {duration: 3500});
        }
      }
    );
  }


  activeEdit() {
    if (this.editActive === false) {
      document.getElementById('titre').removeAttribute('disabled');
      document.getElementById('desc').removeAttribute('disabled');
    } else {
      document.getElementById('titre').setAttribute('disabled', '1');
      document.getElementById('desc').setAttribute('disabled', '1');
    }
    this.editActive = !this.editActive;
  }

  deleteProject(project: Project) {
    this.apiService.deleteProject(project.id).subscribe(
      res => {
        const indexOfProject = this.MyProjects.indexOf(project);
        this.MyProjects.splice(indexOfProject, 1);
        if (this.MyProjects.length > 0) {
          this.activeProject = this.MyProjects[0];
          this.getUserShared(this.MyProjects[0]);
        } else {
          this.activeProject = null;
        }
      },
      error => {
        console.log('Echec');
      }
    );
  }

  deleteSharedUser(user: User, project: Project) {
    this.apiService.deleteUserShared(user.username, project).subscribe(
      res => {
        if (user.username === this.tokenStorage.getUser()) {
          const indexOfProject = this.MyProjectsShared.indexOf(project);
          this.MyProjectsShared.splice(indexOfProject, 1);
        }
        const indexOfUser = this.UsersShared.indexOf(user);
        this.UsersShared.splice(indexOfUser, 1);
      },
      error => {
        console.log('Echec');
      }
    );
  }

  dialogDeleteProject(project: Project) {
    if (project.username === this.tokenStorage.getUser()) {
      const dialogRef = this.dialog.open(DeleteProjectDialogComponent, {
        width: '30rem',
        data: {project}
      });
      dialogRef.afterClosed().subscribe(res => {
          if (res === true) {
            this.deleteProject(project);
          }
        }
      );
    } else {
      this.snackBar.open('Il faut être le créateur du projet', 'Ok', {duration: 3500});
    }
  }

  dialogDeleteSharedUser(user: User, project: Project) {
    if (project.username === this.tokenStorage.getUser() || user.username === this.tokenStorage.getUser()) {
      const dialogRef = this.dialog.open(DeleteSharedUserDialogComponent, {
        width: '30rem',
        data: {user, project}
      });
      dialogRef.afterClosed().subscribe(res => {
          if (res === true) {
            this.deleteSharedUser(user, project);
          }
        }
      );
    } else {
      this.snackBar.open('Il faut être le créateur du projet', 'Ok', {duration: 3500});
    }
  }

  dialogConfirmShareUser(username: string, project: Project) {
    if (project.username === this.tokenStorage.getUser()) {
      const dialogRef = this.dialog.open(ConfirmShareUserComponent, {
        width: '30rem',
        data: {username, project}
      });
      dialogRef.afterClosed().subscribe(res => {
          if (res === true) {
            this.ShareProject(username, project);
          }
        }
      );
    } else {
      this.snackBar.open('Il faut être le créateur du projet', 'Ok', {duration: 3500});
    }

  }

  dialogCreateProject() {
    const dialogRef = this.dialog.open(CreateProjectDialogComponent, {
      width: '30rem'
    });
    dialogRef.afterClosed().subscribe(res => {
        if (!!res) {
          this.creatProject(res);
        }
      }
    );
  }

}
