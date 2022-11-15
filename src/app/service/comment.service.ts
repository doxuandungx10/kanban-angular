import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base-service/base-service.service';
import { UrlConstant } from '../shared/constants/url.class';

@Injectable()
export class CommentService extends BaseService {
  getAllCmtByTask(id: String): any {
    return this.get(UrlConstant.COMMENT + '/getCommentByTaskID' + '?id=' + id);
  }

  addComment(payload: any): any {
    return this.post(UrlConstant.COMMENT + '/addComment', payload);
  }

  updateComment(id: String, payload: any): any {
    return this.put(UrlConstant.COMMENT + '/updateCommentById' + '?id=' + id, payload);
  }

  deleteComment(id: String): any {
    return this.delete(UrlConstant.COMMENT + "/deleteCommentById" + '?id=' + id, null);
  }
}
