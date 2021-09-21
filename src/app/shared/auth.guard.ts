import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AppAuth } from '../services/app-auth.service';
import { Config } from '../services/config';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private auth: AppAuth, private router: Router, public config: Config) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.auth.isAuthenticated.pipe(
            filter(val => val !== null), // Filter out initial Behaviour subject value
            take(1), // Otherwise the Observable doesn't complete!
            map(isAuthenticated => {
                console.log(isAuthenticated);
                if (isAuthenticated) {
                    this.config.dismissLoading();
                    return true;
                } else {
                    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                    return false;
                }
            })
        );
    }

}