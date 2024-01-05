import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private route: Router, private toast: NgToastService) {

  }
  canActivate(): boolean {
    if (this.auth.isLoggedIn() && this.auth.getRoleFromToken() !== "Admin") {
      return true;
    }
    else {
      this.toast.error({ detail: 'Error', summary: "", duration: 3000, });
      this.route.navigate(['login'])
      return false;
    }
  }
}
