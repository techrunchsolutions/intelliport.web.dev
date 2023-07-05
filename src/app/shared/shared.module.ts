import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetModule } from './widget/widget.module';
import { PagetitleComponent } from './pagetitle/pagetitle.component';
import { TipSidebarComponent } from './tipsidebar/tipsidebar.component';

import { SafeTipUrlPipe } from './pipe/safetipurl.pipe';

@NgModule({
  declarations: [
    PagetitleComponent,
    TipSidebarComponent,
    SafeTipUrlPipe
  ],
  imports: [
    CommonModule,
    WidgetModule
  ],
  exports: [PagetitleComponent, TipSidebarComponent]
})
export class SharedModule { }
