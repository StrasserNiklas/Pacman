import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScoreBoardService {

  scores: number[] = [];
  messages: string[] = [];
  scoreMessages: string[] = [];

  constructor(private auth: AuthenticationService, private http: HttpClient, private router: Router) {
   }

  public add(score: number, message: string) {
    this.http.post<any>('/scoreboard', {
      score: score,
      //token: this.auth.token,
      msg: message
    }).subscribe(
      x => {
        console.log(x);

        this.scores = x['scores'] ;
        this.messages = x['msgs'];
        this.parseScoreAndMessagesToString();

        this.router.navigateByUrl('/scoreboard');
      },
      error => {
        console.error(error);
      });
  }

  public getMessages() {
    this.http.get<any>('/scoreboard')
    .subscribe(
      x => {
        console.log(x);

        this.scores = x['scores'] ;//x.body.scores;
        this.messages = x['msgs'];// x.body.msgs;
        this.parseScoreAndMessagesToString();

        //this.router.navigateByUrl('/scoreboard');
      },
      error => {
        console.error(error);
      });
  }

  private parseScoreAndMessagesToString() {
    var index = 0;

    this.scoreMessages = [];

    while (index !== this.scores.length) {
      this.scoreMessages.push(this.scores[index] + ' Message: ' + this.messages[index]);
      index++;
    }
  }

  //public getScores() { return this.scores };
  //public getMessages() { return this.messages };

  
}
