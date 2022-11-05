import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzTabsModule,
    DragDropModule,
  ],
  exports: [
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzTabsModule,
    DragDropModule,
  ],
  declarations: [],
  providers: [],
})
export class ShareModule {}
