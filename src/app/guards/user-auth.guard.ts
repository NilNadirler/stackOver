import { Injectable } from '@angular/core';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { StorageService } from 'src/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  
  constructor(private router:Router, private toastr:ToastrService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!StorageService.getToken()){
        this.router.navigateByUrl("/login")
          this.toastr.error("Please Login first")
        return false;
      }
      
    return true;
  }
  
}
