import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  // const loggedIn:BehaviorSubject<Boolean> = new BehaviorSubject<boolean>(false);
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // loggedIn:any;

  isLoggedInGuard:boolean = false;

  constructor(private afAuth:AngularFireAuth,private toastr:ToastrService, private router:Router) { }

  ngOnInit(): void {
    
  }

  login(email: any,pass: any){
    this.afAuth.signInWithEmailAndPassword(email,pass).then(logRef=>{
        this.toastr.success('Logged in successfully');
        this.loadUser();
        this.loggedIn.next(true);
        this.isLoggedInGuard=true;

        this.router.navigate(['/'])
    }).catch(e =>{
      this.toastr.warning('Oops Wrong credentials..');
    })
  }

  loadUser(){
    this.afAuth.authState.subscribe(user=>{
      localStorage.setItem('user',JSON.stringify(user));
    })
  }

  logOut(){
    this.afAuth.signOut().then(()=>{
      this.toastr.success('Logged Out Successfully..')
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.isLoggedInGuard=false;
      this.router.navigate(['/login']);
    })
  }

  isLoggedIn(){
    return this.loggedIn.asObservable();
  }
}
