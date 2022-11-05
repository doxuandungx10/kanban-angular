import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainviewRoutingModule } from './main-view-routing.module';
import { ShareModule } from 'src/app/shared/share.module';
import { MainViewComponent } from './main-view/main-view.component';

@NgModule({
  declarations: [MainViewComponent],
  imports: [ShareModule, CommonModule, MainviewRoutingModule],
})
export class MainviewModule {}
