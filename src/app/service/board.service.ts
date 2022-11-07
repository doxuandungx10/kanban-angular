import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base-service/base-service.service';
import { UrlConstant } from '../shared/constants/url.class';

@Injectable()
export class BoardService extends BaseService {
  getAllTaskByBoard(id: String): any {
    return this.get(UrlConstant.TASK + '/getAllTasksOfOneBoard' + '?id=' + id);
  }
}
