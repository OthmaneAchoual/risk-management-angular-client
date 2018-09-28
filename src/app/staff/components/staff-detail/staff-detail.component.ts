import { Component, OnInit, Inject } from '@angular/core';
import { StaffService } from '../../../services/staff.service';
import { Observable } from 'rxjs';
import { User } from '../../../models/user';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.scss']
})
export class StaffDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: User,
    private service: StaffService
  ) { }

  person$: Observable<User>;
  manager$: Promise<User>;
  person$$: Promise<User>;

  ngOnInit() {
    this.manager$ = this.user.managed_by && this.service.getById(this.user.managed_by.__KEY);
  }

}
