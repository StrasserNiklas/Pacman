import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  public usernameLogin: string = '';
  public passwordLogin: string = '';

  public usernameLoginErrorText: string = '';
  public pwLoginErrorText: string = '';
  public pwErrorLogin: boolean = false;
  public userNameErrorLogin: boolean = false;

  public usernameRegistration: string = '';
  public passwordRegistration: string = '';
  public confirmPasswordRegistration: string = '';

  public registrationUsernameErrorText: string = '';
  public registrationPasswordErrorText: string = '';
  public pwErrorRegistration: boolean = false;
  public userNameErrorRegistration: boolean = false;

  public serverError: string = '';
  public serverErrorOccuredLogin: boolean = false;
  public serverErrorOccuredRegistration: boolean = false;


  constructor(private auth: AuthenticationService, private http: HttpClient, private router: Router) { }

  ngOnInit() {

    

    $(function () {

      $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
      });
      $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
      });

    });
  }

  login(): void {
    this.serverErrorOccuredLogin = false;

    if (this.usernameLogin.length == 0) {
      this.usernameLoginErrorText = 'Minimal username length is 1.'
      this.userNameErrorLogin = true;
      return;
    } else {
      this.userNameErrorLogin = false;
    }

    if (this.passwordLogin.length < 4) {
      this.pwLoginErrorText = 'Password minimum length is 4.';
      this.pwErrorLogin = true;
      return;
    } else {
      this.pwErrorLogin = false;
    }

    //this.passwordLogin = passwordhasher.generate(this.passwordLogin);

    this.http.post<any>('/signin', {
      username: this.usernameLogin,
      password: this.passwordLogin
    }).subscribe(
      x => {
        console.log(x);
        this.auth.token = x.token;

        if (x.token !== '') {
          this.navigateToGame();
        }
      },
      error => {
        console.error(error);
        this.serverErrorOccuredLogin = true;
        this.serverError = error.error['reason'];
      });
  }

  register(): void {
    this.serverErrorOccuredRegistration = false;

    if (this.usernameRegistration.length == 0) {
      this.registrationUsernameErrorText = 'Minimal username length is 1.'
      this.userNameErrorRegistration = true;
      return;
    } else {
      this.userNameErrorRegistration = false;
    }

    if (this.passwordRegistration.length < 4) {
      this.registrationPasswordErrorText = 'Password minimum length is 4.';
      this.pwErrorRegistration = true;
      return;
    } else {
      this.pwErrorRegistration = false;
    }

    if (this.passwordRegistration != this.confirmPasswordRegistration) {
      this.registrationPasswordErrorText = 'Enter the same password twice.';
      this.pwErrorRegistration = true;
      return;
    } else {
      this.pwErrorRegistration = false;
    }

    //this.passwordRegistration = passwordhasher.generate(this.passwordRegistration);

    this.http.post<any>('/register', {
      username: this.usernameRegistration,
      password: this.passwordRegistration
    }).subscribe(
      x => {
        console.log(x);
        this.auth.token = x.token;

        if (x.token !== '') {
          this.navigateToGame();
        }
      },
      error => {
        console.error(error);
        this.serverErrorOccuredRegistration = true;
        this.serverError = error.error['reason'];
      });
  }

  navigateToGame() {
    this.router.navigateByUrl('/game');
  }
}