import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base-service/base-service.service';
import { Observable } from 'rxjs';
import { UrlConstant } from '../shared/constants/url.class';


@Injectable()
export class WorkspaceService extends BaseService {
  getAllWorkSpace(payload): any {
    return this.get(UrlConstant.WORKSPACE, payload);
  }
}
