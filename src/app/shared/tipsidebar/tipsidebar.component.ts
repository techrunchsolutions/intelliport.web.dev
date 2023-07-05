import { Component, OnInit, Input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-tipsidebar',
  templateUrl: './tipsidebar.component.html',
  styleUrls: ['./tipsidebar.component.scss']
})

/**
 * TipSidebar Component
 */
export class TipSidebarComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() description: string | undefined;
  @Input() videourl: SafeResourceUrl;

  constructor() { }

  ngOnInit(): void {}
}