import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() pageTitle: string;
  @Input() buttonText: string;
  @Input() buttonLink: string;
  @Input() showButton: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
