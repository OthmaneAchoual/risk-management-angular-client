import { Component, OnInit, Inject } from '@angular/core';
import { Choice } from '../../../models/choice';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-choice-detail',
  templateUrl: './choice-detail.component.html',
  styleUrls: ['./choice-detail.component.scss']
})
export class ChoiceDetailComponent implements OnInit {

  loggedIn: Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public choice: Choice,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.loggedIn = this.loginService.loggedIn;
  }

}
