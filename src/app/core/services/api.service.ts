import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable ,  throwError, of, EMPTY } from 'rxjs';
import { catchError, mergeMap, delay, retryWhen, map } from 'rxjs/operators';
import { RestService } from '@abp/ng.core';

import { Logger } from './logger.service';

const log = new Logger('ApiService');

@Injectable({
  providedIn: 'root'
})

/**
 * Api-service Component
 */
export class ApiService {
  error: string | undefined;
  data: string;

  constructor(
    private restService: RestService,
    private http: HttpClient
  ) { }


  getAbp(route: string, apiname: string) {
    return this.restService.request<void, any>(
      { method: 'GET', url: route },
      { apiName: apiname }
    ).pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  request(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.apis.default.url}${path}`, body, {
      reportProgress: true
    }).pipe(catchError(this.formatErrors));
  }

  href(path: string) {
    document.location.href = `${environment.apis.default.url}${path}`;
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    //console.log(`${environment.apis.default.url}${path}`);
    return this.http.get(`${environment.apis.default.url}${path}`, { params }).pipe(
      // delayedRetry(1000, 2),
      catchError(() => {
        //Perform some error handling
        return EMPTY;
      })
    );
  }
  
  // Alternative usage
  // getConfig() {
  //   this.http.get(environment.apis.default.url).subscribe(
  //     config => this.updateConfig(config),
  //     error => {
  //       // Handle error here
  //     },
  //   );
  // }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.apis.default.url}${path}`,body
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {      
    return this.http.post(
      `${environment.apis.default.url}${path}`,body
    ).pipe(catchError(this.formatErrors));
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.delete(
      `${environment.apis.default.url}${path}`, { params}
    ).pipe(catchError(this.formatErrors));
  }
}

const getErrorMessage = (maxRetry: number) => `Tried to load Resource over HHR for ${maxRetry} times without success. Giving up.`; 
const DEFAULT_MAX_RETRIES = 3;

export function delayedRetry(delayMs: number, maxRetry = DEFAULT_MAX_RETRIES) {
  let retries = maxRetry;

  return (src: Observable<any>) => 
    src.pipe(
      retryWhen((errors: Observable<any>) => errors.pipe(
        delay(delayMs),
        mergeMap(error => retries-- > 0 ? of(error) : throwError(getErrorMessage(maxRetry))
      ))    
    )
  );
}