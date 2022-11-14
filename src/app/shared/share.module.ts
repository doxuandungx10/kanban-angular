import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  imports: [
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzTabsModule,
    DragDropModule,
    NzNotificationModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzTabsModule,
    DragDropModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [],
  providers: [],
})
export class ShareModule {}
