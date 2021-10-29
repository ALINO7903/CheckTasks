import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFrm: FormGroup = new FormGroup({
    email: new FormControl(undefined, [Validators.required, Validators.email]),
    password: new FormControl(undefined, [Validators.required])
  });

  constructor(private api: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  doLogin(): void {
    if (this.loginFrm.invalid) {
      this.loginFrm.markAllAsTouched();
    } else {
      this.api.login(this.loginFrm.value)
        .subscribe({
          next: response => {
            if(response.esito) {
              localStorage.setItem("token", response.token);
              localStorage.setItem("username", response.username);
              localStorage.setItem("nome", response.nome);
              localStorage.setItem("cognome", response.cognome);
              this.router.navigateByUrl("/dashboard")
            }
          }, error: error => {
            // Show error
          }
        });
    }
  }

}
