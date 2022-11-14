import { Injectable } from '@angular/core';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import { Component } from '@angular/core';

// @Component({
//   providers: [NzNotificationService],
// })

@Injectable()
export class NotificationService {
  constructor(private notification: NzNotificationService
  ) {
  }
  showNotification(type: string, message: string) {
    this.notification.create(
      type,
      message,
      null,
      {
        nzStyle: {
          fontWeight: 'lighter',
          fontSize: 'larger'
        },
        nzDuration: 5000,
      }
    );
  }
}
