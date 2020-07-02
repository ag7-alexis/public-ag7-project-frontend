import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../model/project';
import {Todo} from '../model/todo/todo';
import {Valid} from '../model/todo/valid';
import {Inprogress} from '../model/todo/inprogress';
import {Done} from '../model/todo/done';
import {Test} from '../model/todo/test';
import {User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'http://localhost:8080/api';
  private ALL_PROJECTS_URL = `${this.BASE_URL}\\project\\allMyProject\\`;
  private ALL_PROJECTS_SHARED_URL = `${this.BASE_URL}\\project\\allMyProjectShared\\`;
  private INSERT_PROJECT_URL = `${this.BASE_URL}\\project\\newProject`;
  private DELETE_PROJECT_URL = `${this.BASE_URL}\\project\\deleteProject\\`;
  private INSERT_TODO_URL = `${this.BASE_URL}\\todo\\newTodo\\`;
  private DELETE_TODO_URL = `${this.BASE_URL}\\todo\\deleteTodo\\`;
  private UPDATE_PROJECT_URL = `${this.BASE_URL}\\project\\saveProject`;
  private UPDATE_TODO_URL = `${this.BASE_URL}\\todo\\saveTodo`;
  private ALL_USERS_SHARED_URL = `${this.BASE_URL}\\project\\allUserShared\\`;
  private ALL_USERS_SEARCH_URL = `${this.BASE_URL}\\project\\getPotentialUsers\\`;
  private SHARE_PROJECT_URL = `${this.BASE_URL}\\project\\shareProject\\`;
  private REMOVE_SHARED_USER_URL = `${this.BASE_URL}\\project\\deleteUserShared\\`;
  private ALL_TODO_URL = `${this.BASE_URL}\\todo\\allTodo\\`;
  private ALL_INPROGRESS_URL = `${this.BASE_URL}\\todo\\allInProgress\\`;
  private ALL_TEST_URL = `${this.BASE_URL}\\todo\\allTest\\`;
  private ALL_DONE_URL = `${this.BASE_URL}\\todo\\allDone\\`;
  private ALL_VALID_URL = `${this.BASE_URL}\\todo\\allValid\\`;
  private UPGRADE_TO_INPROGRESS = `${this.BASE_URL}\\todo\\upgradeTodoToInProgress\\`;
  private UPGRADE_TO_TEST = `${this.BASE_URL}\\todo\\upgradeInProgressToTest\\`;
  private UPGRADE_TO_DONE = `${this.BASE_URL}\\todo\\upgradeTestToDone\\`;
  private UPGRADE_TO_VALID = `${this.BASE_URL}\\todo\\upgradeDoneToValid\\`;
  private GET_PROJECT = `${this.BASE_URL}\\project\\getProject\\`;


  constructor(private http: HttpClient) {
  }

  getMyAllProjects(username: string): Observable<Project[]> {
    return this.http.get<Project[]>(this.ALL_PROJECTS_URL + username);
  }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(this.GET_PROJECT + id);
  }

  getMyAllProjectsShared(username: string): Observable<Project[]> {
    return this.http.get<Project[]>(this.ALL_PROJECTS_SHARED_URL + username);
  }

  getAllUsersSharedToProject(id: string): Observable<User[]> {
    return this.http.get<User[]>(this.ALL_USERS_SHARED_URL + id);
  }

  getPotentialUsers(username: string): Observable<User[]> {
    return this.http.get<User[]>(this.ALL_USERS_SEARCH_URL + username);
  }

  shareProject(username: string, project: Project): Observable<User> {
    return this.http.get<User>(this.SHARE_PROJECT_URL + username + '/' + project.id);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.get(this.DELETE_PROJECT_URL + id);
  }

  deleteUserShared(username: string, project: Project): Observable<any> {
    return this.http.get(this.REMOVE_SHARED_USER_URL + project.id + '/' + username);
  }

  creatProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.INSERT_PROJECT_URL, project);
  }

  getAllTodo(id: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.ALL_TODO_URL + id);
  }

  getAllInprogress(id: string): Observable<Inprogress[]> {
    return this.http.get<Inprogress[]>(this.ALL_INPROGRESS_URL + id);
  }

  getAllTest(id: string): Observable<Test[]> {
    return this.http.get<Test[]>(this.ALL_TEST_URL + id);
  }

  getAllDone(id: string): Observable<Test[]> {
    return this.http.get<Test[]>(this.ALL_DONE_URL + id);
  }

  getAllValid(id: string): Observable<Valid[]> {
    return this.http.get<Valid[]>(this.ALL_VALID_URL + id);
  }

  deleteTodo(id: string): Observable<any> {
    return this.http.get(this.DELETE_TODO_URL + id);
  }


  creatTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.INSERT_TODO_URL + todo.username, todo);
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.UPDATE_PROJECT_URL, project);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.UPDATE_TODO_URL, todo);
  }

  upgradeToInprogress(id: string, username: string): Observable<Inprogress> {
    return this.http.get<Inprogress>(this.UPGRADE_TO_INPROGRESS + username + '/' + id);
  }

  upgradeToTest(id: string, username: string): Observable<Test> {
    return this.http.get<Test>(this.UPGRADE_TO_TEST + username + '/' + id);
  }

  upgradeToDone(id: string, username: string): Observable<Done> {
    return this.http.get<Done>(this.UPGRADE_TO_DONE + username + '/' + id);
  }

  upgradeToValid(id: string, username: string): Observable<Valid> {
    return this.http.get<Valid>(this.UPGRADE_TO_VALID + username + '/' + id);
  }

}
