import { Component, OnInit, Input } from '@angular/core';
import { Risk } from '../../../models/risk';

@Component({
  selector: 'app-risk-nav-item',
  templateUrl: './risk-nav-item.component.html',
  styleUrls: ['./risk-nav-item.component.scss']
})
export class RiskNavItemComponent implements OnInit {

  @Input()
  risk: Risk;

  constructor() { }

  ngOnInit() {
  }

}
