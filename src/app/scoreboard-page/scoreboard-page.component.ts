import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ScoreBoardService } from '../services/score-board.service';

@Component({
  selector: 'app-scoreboard-page',
  templateUrl: './scoreboard-page.component.html',
  styleUrls: ['./scoreboard-page.component.scss']
})
export class ScoreboardPageComponent implements OnInit {
  public scoreList: string[] = [];

  constructor(private scoreService: ScoreBoardService, private auth: AuthenticationService) { }

  ngOnInit() {
    var index = 0;
    var scores = this.scoreService.getScores;
    var messages = this.scoreService.getMessages;

    while (index !== this.scoreService.getScores.length) {
      this.scoreList.push(scores[index] + ' Message: ' + messages[index]);
      index++;
    }

    // testing
    this.scoreList.push('1000' + ' Message: ' + 'get Faked lol');
  }

}
