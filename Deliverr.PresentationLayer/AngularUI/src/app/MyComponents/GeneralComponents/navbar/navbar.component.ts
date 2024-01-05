import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { combineLatest } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  isLoggedIn: any
  Name: any;
  Role: any;
  isAdmin = false;
  constructor(private route: Router, private authService: AuthService,
    private toast: NgToastService, private userStore: UserStoreService,
  ) { }

  ngOnInit(): void {
    // var a = localStorage.getItem('token')
    // console.log("init -> ", a);
    this.isLoggedIn = this.authService.isLoggedIn();

    this.userDetails();

    this.authService.loggedIn$.subscribe((loggedIn: boolean) => {
      console.log("navbar LoggedinStatus:-> ", loggedIn)
      this.isLoggedIn = loggedIn;
    });
  }

  userDetails() {
    combineLatest([
      this.userStore.getFullNameFromStore(),
      this.userStore.getRoleFromStore()
    ]).subscribe(([fullNameFromStore, roleFromStore]) => {
      const fullNameFromToken = this.authService.getFullNameFromToken();
      const roleFromToken = this.authService.getRoleFromToken();

      console.log("Navbar name -> ", fullNameFromStore);
      console.log("Navbar role -> ", roleFromStore);

      this.Name = fullNameFromStore || fullNameFromToken;
      this.Role = roleFromStore || roleFromToken;

      if (this.Role === "Admin") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
  }

  signOut() {
    this.Name = "";
    this.isAdmin = false;
    this.Role = null;
    this.authService.signOut();
    this.toast.success({ detail: 'Success', summary: "Sign Out Successful", duration: 3000, });
  }
}
