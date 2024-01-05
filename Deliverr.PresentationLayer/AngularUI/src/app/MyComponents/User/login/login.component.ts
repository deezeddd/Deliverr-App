import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Subscriber } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStoreService } from 'src/app/Services/user-store.service';
import { NotfoundComponent } from '../../GeneralComponents/notfound/notfound.component';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent  {

  constructor(
    private toast: NgToastService,
    private authService: AuthService,
    private route: Router,
    private userStore: UserStoreService
  ) { }


  Login = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  isSubmitted = false; // on submitting
  onLogin() {
    this.isSubmitted = true;
    if (this.Login.valid) {
      this.authService.login(this.Login.value).subscribe(
        (res: any) => {
          //JWT token stored
          // console.log("Res - >", res.token);
          this.authService.storeToken(res.token)
          this.toast.success({ detail: 'Success', summary: res.message, duration: 3000, });
          this.authService.isLoggedIn();
          this.route.navigate(['products']);
        },
        (err: any) => {
          console.log("Login Comp err ",err.error);
          this.toast.error({ detail: 'Unsuccessful', summary: err.error.error, duration: 3000, });
        }
      );
    }

  }

}
