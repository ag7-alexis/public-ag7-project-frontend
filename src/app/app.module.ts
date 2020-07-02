import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProjectComponent} from './project/project.component';
import {HomeComponent} from './home/home.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {ConnexionComponent} from './connexion/connexion.component';
import {AuthInterceptor} from './shared/auth-interceptor';
import {SimpleProjectComponent} from './project/elements/simple-project/simple-project.component';
import {TodoComponent} from './todo/todo.component';
import {SimpleTodoComponent} from './todo/elements/simple-todo/simple-todo.component';
import {SimpleInprogressComponent} from './todo/elements/simple-inprogress/simple-inprogress.component';
import {SimpleTestComponent} from './todo/elements/simple-test/simple-test.component';
import {SimpleDoneComponent} from './todo/elements/simple-done/simple-done.component';
import {SimpleValidComponent} from './todo/elements/simple-valid/simple-valid.component';
import {DisconnectDialogComponent} from './dialog/disconnect-dialog/disconnect-dialog.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatDialogModule, MatSnackBarModule} from '@angular/material';
import {DeleteProjectDialogComponent} from './dialog/delete-project-dialog/delete-project-dialog.component';
import {DeleteSharedUserDialogComponent} from './dialog/delete-shared-user-dialog/delete-shared-user-dialog.component';
import {ConfirmShareUserComponent} from './dialog/confirm-share-user-dialog/confirm-share-user.component';
import { CreateProjectDialogComponent } from './dialog/create-project-dialog/create-project-dialog.component';
import { DeleteTodoDialogComponent } from './dialog/delete-todo-dialog/delete-todo-dialog.component';
import { ConfirmUpgradeTodoDialogComponent } from './dialog/confirm-upgrade-todo-dialog/confirm-upgrade-todo-dialog.component';
import { CreateTodoDialogComponent } from './dialog/create-todo-dialog/create-todo-dialog.component';
import { NotifRegisterDialogComponent } from './dialog/notif-register-dialog/notif-register-dialog.component';


const appRoutes: Routes = [
  {
    path: 'project',
    component: ProjectComponent
  },
  {
    path: 'todo/:id',
    component: TodoComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'inscription',
    component: InscriptionComponent,
  },
  {
    path: 'connexion',
    component: ConnexionComponent,
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotFoundComponent,
    ProjectComponent,
    HomeComponent,
    InscriptionComponent,
    ConnexionComponent,
    SimpleProjectComponent,
    TodoComponent,
    SimpleTodoComponent,
    SimpleInprogressComponent,
    SimpleTestComponent,
    SimpleDoneComponent,
    SimpleValidComponent,
    DisconnectDialogComponent,
    DeleteProjectDialogComponent,
    DeleteSharedUserDialogComponent,
    ConfirmShareUserComponent,
    CreateProjectDialogComponent,
    DeleteTodoDialogComponent,
    ConfirmUpgradeTodoDialogComponent,
    CreateTodoDialogComponent,
    NotifRegisterDialogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NoopAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  entryComponents: [
    DisconnectDialogComponent,
    DeleteProjectDialogComponent,
    DeleteSharedUserDialogComponent,
    ConfirmShareUserComponent,
    CreateProjectDialogComponent,
    DeleteTodoDialogComponent,
    ConfirmUpgradeTodoDialogComponent,
    CreateTodoDialogComponent,
    NotifRegisterDialogComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
