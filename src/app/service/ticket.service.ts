import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base-service/base-service.service';
import { Observable } from 'rxjs';
import { UrlConstant } from '../shared/constants/url.class';

@Injectable()
export class TicketService extends BaseService {
  getAllTicketOfAllWS(): any {
    return this.get(UrlConstant.TICKET + '/getAllTicketOfAllWorkSpaces');
  }

  getAllTicketByWS(id: String): any {
    return this.get(UrlConstant.WORKSPACE + '/getAllTicketsOfOneWorkSpace' + '?id=' + id);
  }
}
