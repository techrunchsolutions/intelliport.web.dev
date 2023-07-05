import { Component, OnInit } from '@angular/core';
import { LAYOUT_MODE } from '../../layouts/layouts.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

/**
 * Maintenance-Component Component
 */
export class HomeComponent implements OnInit {
  layout_mode!: string;

  constructor() { }

  ngOnInit(): void {
    document.body.style.backgroundImage = "url('../../../assets/images/ach/redtechbg.jpg')";
    this.layout_mode = LAYOUT_MODE
    if(this.layout_mode === 'dark') {
      document.body.setAttribute("data-layout-mode", "dark");
    }
  }

}