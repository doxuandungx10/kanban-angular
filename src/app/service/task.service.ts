import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base-service/base-service.service';
import { Observable } from 'rxjs';
import { UrlConstant } from '../shared/constants/url.class';

@Injectable()
export class TaskService extends BaseService {
  getAllTaskByTicket(id: String): any {
    return this.get(UrlConstant.TICKET + '/getAllTasksOfOneTicket' + '?id=' + id);
  }
}
