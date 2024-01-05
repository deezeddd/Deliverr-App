import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
private fullName$ = new BehaviorSubject<string>("");
private userId$ = new BehaviorSubject<string>("");
private role$ = new BehaviorSubject<string>("");
  constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role : string){
    this.role$.next(role);
  }

  public setFullNameForStore(fullname: string): void {
    this.fullName$.next(fullname);
  }

  public getFullNameFromStore(): Observable<string> {
    console.log("Service ", this.fullName$.asObservable());
    return this.fullName$.asObservable();
  }

  public setUserIdForStore(userId: string): void {
    this.userId$.next(userId);
  }

  public getUserIdFromStore(): Observable<string> {
    console.log(this.userId$.asObservable());
    return this.userId$.asObservable();
  }



}
