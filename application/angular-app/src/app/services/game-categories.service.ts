import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthHTTPService } from '../auth/services/auth-http.service';

@Injectable({ providedIn: 'root' })
export class GameCategoriesService {
  authHttp = inject(AuthHTTPService);

  getGameCategories(): Observable<any> {
    console.log('getGameCategories service');

    return this.authHttp.get(`${environment.apiBaseUrl}/game-categories`);
  }
}
