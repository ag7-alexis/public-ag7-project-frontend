import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Todo} from '../model/todo/todo';
import {Inprogress} from '../model/todo/inprogress';
import {Test} from '../model/todo/test';
import {Done} from '../model/todo/done';
import {Valid} from '../model/todo/valid';
import {ApiService} from '../shared/api.service';
import {TokenStorageService} from '../shared/token-storage.service';
import {MatDialog} from '@angular/material';
import {DeleteTodoDialogComponent} from '../dialog/delete-todo-dialog/delete-todo-dialog.component';
import {ConfirmUpgradeTodoDialogComponent} from '../dialog/confirm-upgrade-todo-dialog/confirm-upgrade-todo-dialog.component';
import {CreateTodoDialogComponent} from '../dialog/create-todo-dialog/create-todo-dialog.component';

export interface DialogUpgradeTodoData {
  state: string;
  next: string;
}

export interface DialogCreateTodoData {
  idProject: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  idProject: string;
  Todos: Todo[] = [];
  Inprogress: Inprogress[] = [];
  Tests: Test[] = [];
  Dones: Done[] = [];
  Valids: Valid[] = [];
  validLoad = false;
  isLoad = 0;


  constructor(private route: ActivatedRoute, private apiService: ApiService,
              private tokenStorage: TokenStorageService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe(value => {
        this.idProject = value.id;
      },
      error => {
        console.log('erreurr');
      });
    this.getAllTodo(this.idProject);
    this.getAllInprogress(this.idProject);
    this.getAllTest(this.idProject);
    this.getAllDone(this.idProject);
  }

  getAllTodo(id: string) {
    this.apiService.getAllTodo(id).subscribe(
      res => {
        this.Todos = res;
        this.isLoad++;
      },
      error => {
        console.log('erreur');
      }
    );
  }

  getAllInprogress(id: string) {
    this.apiService.getAllInprogress(id).subscribe(
      res => {
        this.Inprogress = res;
        this.isLoad++;
      },
      error => {
        console.log('erreur');
      }
    );
  }

  getAllTest(id: string) {
    this.apiService.getAllTest(id).subscribe(
      res => {
        this.Tests = res;
        this.isLoad++;
      },
      error => {
        console.log('erreur');
      }
    );
  }

  getAllDone(id: string) {
    this.apiService.getAllDone(id).subscribe(
      res => {
        this.Dones = res;
        this.isLoad++;
      },
      error => {
        console.log('erreur');
      }
    );
  }

  getAllValid(id: string) {
    this.apiService.getAllValid(id).subscribe(
      res => {
        this.Valids = res;
        this.validLoad = true;
      },
      error => {
        console.log('erreur');
      }
    );
  }

  getMyTodoShow(num: string) {
    if (document.getElementById('showMyTodo' + num).style.display !== 'block') {
      document.getElementById('showMyTodo' + num).style.display = 'block';
      document.getElementById('showMyTodo-button' + num).classList.replace('test', 'test2');
    } else {
      document.getElementById('showMyTodo' + num).style.display = 'none';
      document.getElementById('showMyTodo-button' + num).classList.replace('test2', 'test');
    }
  }

  newTodo(newTodo: Todo) {
    this.apiService.creatTodo(newTodo).subscribe(
      value => {
        this.Todos.unshift(value);
      },
      error => {
        console.log('erreur');
      }
    );

  }

  public updateTodo(todo: Todo) {
    this.apiService.updateTodo(todo).subscribe(
      value => {
      },
      error => {
        console.log('erreur');
      }
    );
  }

  public deleteTodo(todo: Todo) {
    this.apiService.deleteTodo(todo.id).subscribe(
      value => {
        const indexOfTodo = this.Todos.indexOf(todo);
        this.Todos.splice(indexOfTodo, 1);
      },
      error => {
        console.log('Erreur');
      }
    );
  }

  public deleteInprogress(inprogress: Inprogress) {
    this.apiService.deleteTodo(inprogress.id).subscribe(
      value => {
        const indexOfInprogress = this.Inprogress.indexOf(inprogress);
        this.Inprogress.splice(indexOfInprogress, 1);
      },
      error => {
        console.log('Erreur');
      }
    );
  }

  public deleteTest(test: Test) {
    this.apiService.deleteTodo(test.id).subscribe(
      value => {
        const indexOfTest = this.Tests.indexOf(test);
        this.Tests.splice(indexOfTest, 1);
      },
      error => {
        console.log('Erreur');
      }
    );
  }

  public upgradeToInprogress(todo: Todo) {
    this.apiService.upgradeToInprogress(todo.id, this.tokenStorage.getUser()).subscribe(
      value => {
        const indexOfTodo = this.Todos.indexOf(todo);
        this.Todos.splice(indexOfTodo, 1);
        this.Inprogress.unshift(value);
      },
      error => {
        console.log('erreur');
      }
    );
  }

  public upgradeToTest(inprogress: Inprogress) {
    this.apiService.upgradeToTest(inprogress.id, this.tokenStorage.getUser()).subscribe(
      value => {
        const indexOfInprogress = this.Inprogress.indexOf(inprogress);
        this.Inprogress.splice(indexOfInprogress, 1);
        this.Tests.unshift(value);
      },
      error => {
        console.log('erreur upgrade to test');
      }
    );
  }

  public upgradeToDone(test: Test) {
    this.apiService.upgradeToDone(test.id, this.tokenStorage.getUser()).subscribe(
      value => {
        const indexOfTest = this.Tests.indexOf(test);
        this.Tests.splice(indexOfTest, 1);
        this.Dones.unshift(value);
      },
      error => {
        console.log('erreur upgrade to done');
      }
    );
  }

  upgradeToValid(done: Done) {
    this.apiService.upgradeToValid(done.id, this.tokenStorage.getUser()).subscribe(
      value => {
        const indexOfDone = this.Dones.indexOf(done);
        this.Dones.splice(indexOfDone, 1);
        this.Valids.unshift(value);
      },
      error => {
        console.log('erreur upgrade to valid');
      }
    );
  }

  deleteDone(done: Done) {
    this.apiService.deleteTodo(done.id).subscribe(
      value => {
        const indexOfDone = this.Dones.indexOf(done);
        this.Dones.splice(indexOfDone, 1);
      },
      error => {
        console.log('Erreur');
      }
    );
  }

  dialogDeleteTodo(obj: any, type: string) {
    const dialogRef = this.dialog.open(DeleteTodoDialogComponent, {
      width: '30rem'
    });
    dialogRef.afterClosed().subscribe(res => {
        if (res === true) {
          if (type === 'todo') {
            this.deleteTodo(obj);
          } else if (type === 'inprogress') {
            this.deleteInprogress(obj);
          } else if (type === 'test') {
            this.deleteTest(obj);
          } else if (type === 'done') {
            this.deleteDone(obj);
          } else {
            console.log('erreur delete');
          }

        }
      }
    );
  }

  dialogUpgradeTodo(obj: any, state: string, next: string) {
    const dialogRef = this.dialog.open(ConfirmUpgradeTodoDialogComponent, {
      width: '30rem',
      data: {state, next}
    });
    dialogRef.afterClosed().subscribe(res => {
        if (res === true) {
          if (state === 'todo') {
            this.upgradeToInprogress(obj);
          } else if (state === 'inprogress') {
            this.upgradeToTest(obj);
          } else if (state === 'test') {
            this.upgradeToDone(obj);
          } else if (state === 'done') {
            this.upgradeToValid(obj);
          } else {
            console.log('erreur upgrade');
          }
        }
      }
    );
  }

  dialogCreateTodo(idProject: string) {
    const dialogRef = this.dialog.open(CreateTodoDialogComponent, {
      width: '30rem',
      data: {idProject}
    });
    dialogRef.afterClosed().subscribe(res => {
        if (!!res) {
          this.newTodo(res);
        }
      }
    );
  }
}
