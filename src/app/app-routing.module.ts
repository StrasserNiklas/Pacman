import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { ScoreboardPageComponent } from './scoreboard-page/scoreboard-page.component';
import { IsLoggedInGuardServiceService } from './guards/is-logged-in-guard-service.service';

const routes: Routes = [
  { path: 'home', component: RegistrationPageComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'game', component: GamePageComponent},//, canActivate: [IsLoggedInGuardServiceService] },
  { path: 'scoreboard', component: ScoreboardPageComponent, canActivate: [IsLoggedInGuardServiceService]  },
  { path: '**', component: RegistrationPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
