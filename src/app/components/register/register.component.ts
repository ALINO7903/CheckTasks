import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerFrm: FormGroup = new FormGroup({
    username: new FormControl(undefined, [Validators.required]),
    email: new FormControl(undefined, [Validators.required, Validators.email]),
    nome: new FormControl(undefined, [Validators.required]),
    cognome: new FormControl(undefined, [Validators.required]),
    password: new FormControl(undefined, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  });
  constructor(private api: AuthService) { }

  ngOnInit(): void {
  }

  doRegister() {
    if (this.registerFrm.invalid) {
      this.registerFrm.markAllAsTouched();
    } else {
      this.api.register(this.registerFrm.value)
        .subscribe({
          next: response => {
            // TODO
          }, error: error => {
            console.error(error);
          }
        });
    }
  }

}
