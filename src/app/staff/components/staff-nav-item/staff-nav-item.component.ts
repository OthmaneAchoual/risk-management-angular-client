import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  selector: 'app-staff-nav-item',
  templateUrl: './staff-nav-item.component.html',
  styleUrls: ['./staff-nav-item.component.scss']
})
export class StaffNavItemComponent implements OnInit {

  @Input()
  agent: User;

  constructor() { }

  ngOnInit() {
  }

}
