import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base-service/base-service.service';
import { UrlConstant } from '../shared/constants/url.class';

@Injectable()
export class BoardService extends BaseService {
  getBoardById(id: String): any {
    return this.get(UrlConstant.BOARD + '/getBoardByID' + '?id=' + id);
  }
}
