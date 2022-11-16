import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthModel} from '../models/auth.model';
import {HttpClient} from '@angular/common/http';
import {Constant} from '../shared/constants/constant.class';
import {AppConfigService} from '../../app-config.service';
import {UrlConstant} from '../shared/constants/url.class';
@Injectable()
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private configService: AppConfigService
  ) {}
  login(payload): Observable<AuthModel> {
    return this.httpClient.post(
      this.configService.getConfig().api.baseUrl + '/login',
      payload
    );
  }
//   logout() {
//     const headers = {
//       Authorization: 'Bearer ' + localStorage.getItem(Constant.TOKEN),
//     };
//     let token = localStorage.getItem(localStorage.getItem(Constant.TOKEN));
//     token = 'Bearer ' + localStorage.getItem(Constant.TOKEN);
//     return this.httpClient.post(
//       this.configService.getConfig().api.baseUrl + UrlConstant.LOGOUT,
//       token,
//       { headers }
//     );
//   }
//   checkToken(): any {
//     const headers = {
//       Authorization: 'Bearer ' + localStorage.getItem(Constant.TOKEN),
//     };
//     let token = localStorage.getItem(localStorage.getItem(Constant.TOKEN));
//     token = 'Bearer ' + localStorage.getItem(Constant.TOKEN);
//     return this.httpClient.post(
//       this.configService.getConfig().api.baseUrl + UrlConstant.VALIDATE,
//       token,
//       { headers }
//     );
//   }
//   checkTokenAdmin(): any {
//     const headers = {
//       Authorization: 'Bearer ' + localStorage.getItem(Constant.TOKEN),
//     };
//     let token = localStorage.getItem(localStorage.getItem(Constant.TOKEN));
//     token = 'Bearer ' + localStorage.getItem(Constant.TOKEN);
//     return this.httpClient.post(
//       this.configService.getConfig().api.baseUrl + UrlConstant.VALIDATE_ADMIN,
//       token,
//       { headers }
//     );
//   }
//   checkTokenCSC(): any {
//     const headers = {
//       Authorization: 'Bearer ' + localStorage.getItem(Constant.TOKEN),
//     };
//     let token = localStorage.getItem(localStorage.getItem(Constant.TOKEN));
//     token = 'Bearer ' + localStorage.getItem(Constant.TOKEN);
//     return this.httpClient.post(
//       this.configService.getConfig().api.baseUrl + UrlConstant.VALIDATE_CSC,
//       token,
//       { headers }
//     );
//   }
  registration(payload): any {
    return this.httpClient.post(
      this.configService.getConfig().api.baseUrl + '/User/Signup',
      payload
    );
  }
}
