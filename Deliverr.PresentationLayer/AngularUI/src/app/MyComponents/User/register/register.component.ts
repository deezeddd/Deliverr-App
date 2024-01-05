import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private auth: AuthService, private toast: NgToastService, private route: Router) {

  }

  mustMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { match: true };
    }
    return null;
  }

  Register = new FormGroup({

    name: new FormControl('',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
    email: new FormControl('',
      [
        Validators.required,
        Validators.email
      ]),
    phone: new FormControl('',
      [
        Validators.required,
        Validators.pattern('[6-9]\\d{9}'),
        Validators.minLength(10)
      ]),
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
      ]),
    confirmPassword: new FormControl('', Validators.required),
  },
    {
      validators: [this.mustMatch.bind(this)]
    });

  isSubmitted = false;
  onSubmit() {
    this.isSubmitted = true;
    if (this.Register.valid) {
      this.auth.register(this.Register.value)
        .subscribe((res) => {
          this.toast.success({ detail: "Registration Successful", summary: "", duration: 3000 })  // All this with services( success or unsuccessfull)
          this.route.navigate(['login']);

        },
          err => {
            // console.log(err.error.message); // for checking errors
            this.toast.error({ detail: "Registration Unsuccessful", summary: "Email is Already Taken", duration: 3000 })

          }
        )
    }
  }

}
