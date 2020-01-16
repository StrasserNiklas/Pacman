import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ScoreBoardService } from '../services/score-board.service';

@Component({
  selector: 'app-scoreboard-page',
  templateUrl: './scoreboard-page.component.html',
  styleUrls: ['./scoreboard-page.component.scss']
})
export class ScoreboardPageComponent implements OnInit {
  constructor(private scoreService: ScoreBoardService, private auth: AuthenticationService) { }

  ngOnInit() {
    if (this.scoreService.scoreMessages.length === 0) {
      this.scoreService.getMessages();
    }
  }

}
