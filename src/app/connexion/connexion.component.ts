import {Component, OnInit} from '@angular/core';
import {Credentials} from '../shared/credentials';
import {AuthService} from '../shared/auth.service';
import {TokenStorageService} from '../shared/token-storage.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;

  credentials: Credentials = {username: '', password: ''};

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: [''],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  public login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.credentials.username = this.f.username.value;
    this.credentials.password = this.f.password.value;

    this.authService.login(this.credentials).subscribe(
      value => {
        this.tokenStorage.saveToken(value.headers.get('Authorization'));
        this.tokenStorage.saveUser(this.credentials.username);
        this.router.navigateByUrl('/home');
      },
      error => {
        document.getElementById('echec-conn').style.display = 'block';
      });
  }
}
