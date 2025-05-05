import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthHTTPService } from '../auth/services/auth-http.service';

@Injectable({ providedIn: 'root' })
export class GamesService {
  authHttp = inject(AuthHTTPService);

  getGamesByCategory(gameCategory: string | undefined): Observable<any> {
    return this.authHttp.get(`${environment.apiBaseUrl}/games/${gameCategory}`);
  }
}
