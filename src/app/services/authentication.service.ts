import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public token = ''; // interceptor dies if undefined

  constructor() { }
}
