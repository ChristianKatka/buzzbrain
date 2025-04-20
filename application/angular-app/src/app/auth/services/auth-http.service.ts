import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
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

  // private getAuthHttpHeaders(contentType: string): Observable<any> {
  //   return this.store.select(AuthTokensSelectors.getIdToken).pipe(
  //     map(
  //       (idToken) =>
  //         new HttpHeaders({
  //           'Content-Type': contentType,
  //           Authorization: idToken,
  //         })
  //     )
  //   );
  // }

  private getAuthHttpHeaders(contentType: string): Observable<HttpHeaders> {
    return of(
      new HttpHeaders({
        'Content-Type': contentType,
        Authorization:
          'eyJraWQiOiJWODIzR2xxdGtmNlNiNjRrNW9zN202aFFpekpZUWc2TTZwMU9PZnV4NXhJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIyMDZjNDliYy00MGExLTcwMjctZDhlOC03ZWYyZTg3Y2NkNGYiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tXC9ldS1ub3J0aC0xX3JvQ0ZuekdFUCIsImNvZ25pdG86dXNlcm5hbWUiOiJja2F0a2FAaG90bWFpbC5jb20iLCJvcmlnaW5fanRpIjoiODhkOTEwN2YtMzJiYy00ZDUwLTk5ZGMtMTRhYWQzODg5MTEwIiwiYXVkIjoiNHE3bGNjYXFoNTdtcGJ0bWdqcGgzMDJ2dG8iLCJldmVudF9pZCI6IjVlOWFkNmMzLTg5ZTktNDQ3My1iNjU1LWE3ODhiYWQ4ZmI4YyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzQ0NTYyMDQyLCJleHAiOjE3NDQ5MjYwMTUsImlhdCI6MTc0NDkyMjQxNSwianRpIjoiMzM0ZDgxMTYtMzY2NC00MzIwLWFjMmItYzVkN2UzMTllZDYxIiwiZW1haWwiOiJja2F0a2FAaG90bWFpbC5jb20ifQ.W7u4ItNZZvOVbtkCKDkoGwp0UEA6QX12tveHsIs_AvEty_hoaN9DjOp54vpFuRoAbgGXHmfocjrS6FClvLL0WfM2LoE0GReq9M0ymTlbW2i8_D4sZ9PKU-t-r5MRvWnwC1FoOMFkSyPoFQ8eVrGfBNIH_CPYTgx-Jvh7HT6IAHTXt5dCKlXq0V2T1hNqbP8y9bDTq5npOVTzM6XMwNkiErtb4r2pZlnSYxVAGvuPO9cG2jeNOp4DICf1jRxrypojfiwWJGwmZ3bjmCFV25hjC_hu897zmzkut0ZEl2sdNqAKzElu4OdPWqiG72Dzc_qi48e9VDKDYD9h7BjhGx4yMg',
      })
    );
  }
}
