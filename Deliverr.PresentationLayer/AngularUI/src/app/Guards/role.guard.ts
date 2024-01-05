import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { UserStoreService } from '../Services/user-store.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private userStore: UserStoreService, private route: Router) {
  }
  Role: any;
  canActivate(): boolean {
    this.userStore.getFullNameFromStore().subscribe(val => {
      let fullNameFromToken = this.auth.getFullNameFromToken()
      this.Role = val || fullNameFromToken;
    })
    if (this.Role == "Admin")
      return true;
    else {
      this.route.navigate(['']);
      return false;
    }
  }


}
