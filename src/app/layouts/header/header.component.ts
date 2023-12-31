import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private auth:AuthService){}

  userEmail:any;
  isLoggedIn$!: Observable<boolean>;

  ngOnInit(): void {
    // console.log(JSON.stringify(localStorage.getItem('user')).email);
    this.userEmail=(JSON.parse(localStorage.getItem('user')!).email);
    
     this.isLoggedIn$ = this.auth.isLoggedIn();
  }

  onLogOut(){
    this.auth.logOut();
  }

}
