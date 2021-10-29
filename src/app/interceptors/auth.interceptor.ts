import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log("Sono nell'intercept di AuthInterceptor");
    const token = localStorage.getItem('token');

    if(token) {
      let headers = new HttpHeaders();
      headers = headers.set("x-access-token", token);
      const newRequest = request.clone({
        headers: headers
      });
      return next.handle(newRequest);
    }

    return next.handle(request);
  }
}
