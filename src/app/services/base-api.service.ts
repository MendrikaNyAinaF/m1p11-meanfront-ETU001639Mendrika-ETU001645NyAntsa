import { HttpClient, HttpContext, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage/storage.service';
import { Observable } from 'rxjs';

export interface HttpOptions {
  params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  responseType?: 'json';
  body?: any | null;
}

@Injectable({
  providedIn: 'root'
})
export class BaseApiService implements HttpInterceptor{
  jwtToken: string | null;
  userInfo: string = "user_Info";
  jwtTokenKey: string = "jwtToken";

  constructor(private http: HttpClient, private storage: StorageService) {
    this.jwtToken = this.storage.getItem(this.jwtTokenKey);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.jwtToken === null){
      this.jwtToken = this.storage.getItem(this.jwtTokenKey);
    }
    const request = req.clone({
      headers: req.headers.set('Authorization', this.jwtToken || ''),
    });
    return next.handle(request);
  }

  get(url: string, options?: HttpOptions) {
    return new Promise((resolve, reject) => {
      this.http.get(url, options).subscribe((data) => {
        resolve(data);
      }, (error) => {
        console.error(error);
        reject(error);
      });
    });
  }

  post(url: string, data?: any, options?: HttpOptions) {
    return new Promise((resolve, reject) => {
      this.http.post(url, data, options).subscribe((data) => {
        resolve(data);
      }, (error) => {
        console.error(error);
        reject(error);
      });
    });
  }

  delete(url: string, options?: HttpOptions) {
    return new Promise((resolve, reject) => {
      this.http.delete(url, options).subscribe((data) => {
        resolve(data);
      }, (error) => {
        console.error(error);
        reject(error);
      });
    }
    );
  }

  put(url: string, data?: any, options?: HttpOptions) {
    return new Promise((resolve, reject) => {
      this.http.put(url, data, options).subscribe((data) => {
        resolve(data);
      }, (error) => {
        console.error(error);
        reject(error);
      });
    });
  }
}
