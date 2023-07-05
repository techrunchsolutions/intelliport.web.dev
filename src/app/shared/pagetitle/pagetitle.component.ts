import { Component, OnInit, Input, Inject, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagetitle',
  templateUrl: './pagetitle.component.html',
  styleUrls: ['./pagetitle.component.scss']
})

/**
 * Page-Title Component
 */
export class PagetitleComponent implements OnInit {

  @Input()
  breadcrumbItems!: Array<{
    active?: boolean;
    label?: string;
  }>;

  @Input() title: string | undefined;

  constructor() { }

  // @Output() tipsButtonClicked = new EventEmitter();

  ngOnInit(): void {
  }  

  // /**
  //  * Toggles the right sidebar
  //  */
  //  toggleRightSidebar() {
  //   this.tipsButtonClicked.emit();
  // }

}