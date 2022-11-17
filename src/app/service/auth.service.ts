import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Constant} from '../shared/constants/constant.class';
import {AppConfigService} from '../../app-config.service';
import { JwtAutResponse } from '../models/jwt-aut-response';
import { map } from 'rxjs/operators';
import { BaseService } from '../shared/base-service/base-service.service';
import { UrlConstant } from '../shared/constants/url.class';



@Injectable()
export class AuthService extends BaseService {
  baseUrl = this.configService.getConfig().api.baseUrl;

  register(registerPayload: any): Observable<any> {
    return this.post(UrlConstant.USERS + '/createUser', registerPayload);
  }

  login(loginPayload: any): Observable<boolean> {
    return this.httpClient
      .post<JwtAutResponse>(this.baseUrl + '/api/users/login', loginPayload)
      .pipe(
        map((data) => {
          // this.localStoraqeService.store('authenticationToken', data.authenticationToken);
          // this.localStoraqeService.store('username', data.username);
          // window.localStorage.removeItem('authenticationToken');
          // window.localStorage.removeItem('username');
          window.localStorage.setItem(
            'authenticationToken',
            data.authenticationToken
          );
          window.localStorage.setItem('username', data.username);
          return true;
        })
      );
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('username') != null;
  }

  logout() {
    window.localStorage.clear();
  }
}
