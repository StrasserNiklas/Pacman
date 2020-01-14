import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptorService implements HttpInterceptor {

  constructor(private auth: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

      if (req.url.endsWith('signin')) {
          return next.handle(req);
      }

      // Clone the request and set the new header in one step.
      const authReq = req.clone({ setHeaders: { Authorization: this.auth.token } });

      // send cloned request with header to the next handler.
      return next.handle(authReq);
  }
}
