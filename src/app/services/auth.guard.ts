import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate{

  constructor(private auth:AuthService,private router:Router,private toastr:ToastrService){}

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    if(this.auth.isLoggedInGuard){
      return true;
    }
    else{
      this.toastr.warning('You Do not have permission')
      this.router.navigate(['/login']);
      return false;
    }
  }

  
};
