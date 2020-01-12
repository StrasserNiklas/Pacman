import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScoreBoardService {

  private scores: number[] = [];
  private messages: string[] = [];

  constructor(private auth: AuthenticationService, private http: HttpClient, private router: Router) {
    // testing
    this.scores.push(1832);
   }

  public add(score: number, message: string) {
    this.http.post<any>('http://localhost:3000/scoreboard', {
      score: score,
      token: this.auth.token,
      msg: message
    }).subscribe(
      x => {
        console.log(x);

        this.scores = x.body.scores;
        this.messages = x.body.msgs;

        this.router.navigateByUrl('/scoreboard');
      },
      error => {
        console.error(error);
      });
  }

  public getScores() { return this.scores };
  public getMessages() { return this.messages };

  
}
