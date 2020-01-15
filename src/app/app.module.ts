import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { ScoreboardPageComponent } from './scoreboard-page/scoreboard-page.component';
import { AuthenticationInterceptorService } from './services/authentication-interceptor.service';
import { HelpPageComponent } from './help-page/help-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
    GamePageComponent,
    ScoreboardPageComponent,
    HelpPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
        useClass: AuthenticationInterceptorService,
        multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
