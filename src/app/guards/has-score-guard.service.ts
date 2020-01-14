import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ScoreBoardService } from '../services/score-board.service';

@Injectable({
  providedIn: 'root'
})
export class HasScoreGuardService implements CanActivate {
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    if (this.score.scores.length > 0) {
      return true;
    } else {
      // magic: moves the player to the game screen, because there are no scores
      return this.router.parseUrl('/game'); 
    }
  }

  constructor(private score: ScoreBoardService ,private router: Router) { }
}
