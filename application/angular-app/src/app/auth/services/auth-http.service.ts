import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthTokensSelectors } from '../../../store/selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthHTTPService {
  http = inject(HttpClient);
  store = inject(Store);

  public get(url: string): Observable<any> {
    return this.getHttpOptions('application/json').pipe(
      switchMap((httpOptions) => this.http.get(url, httpOptions))
    );
  }

  public post(url: string, body: any): Observable<any> {
    return this.getHttpOptions('application/json').pipe(
      switchMap((httpOptions) => this.http.post(url, body, httpOptions))
    );
  }

  public put(url: string, body: any): Observable<any> {
    return this.getHttpOptions('application/json').pipe(
      switchMap((httpOptions) => this.http.put(url, body, httpOptions))
    );
  }

  public delete(url: string): Observable<any> {
    return this.getHttpOptions('application/json').pipe(
      switchMap((httpOptions) => this.http.delete(url, httpOptions))
    );
  }

  private getHttpOptions(contentType: string): Observable<any> {
    return this.getAuthHttpHeaders(contentType).pipe(
      map((authHttpHeaders) => ({
        headers: authHttpHeaders,
      }))
    );
  }

  private getAuthHttpHeaders(contentType: string): Observable<any> {
    return this.store.select(AuthTokensSelectors.getIdToken).pipe(
      map(
        (idToken) =>
          new HttpHeaders({
            'Content-Type': contentType,
            Authorization: idToken,
          })
      )
    );
  }
}
