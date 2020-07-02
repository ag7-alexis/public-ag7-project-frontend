import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/auth.service';
import {MatDialog} from '@angular/material';
import {NotifRegisterDialogComponent} from '../dialog/notif-register-dialog/notif-register-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(this.f.username.value, this.f.password.value).subscribe(
      value => {
        const dialogRef = this.dialog.open(NotifRegisterDialogComponent, {
          width: '30rem'
        });
        dialogRef.afterClosed().subscribe(res => {
            this.router.navigateByUrl('/connexion');
          }
        );
      },
      error => {
        document.getElementById('echec-insc').style.display = 'block';
      },
    );
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({mustMatch: true});
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
