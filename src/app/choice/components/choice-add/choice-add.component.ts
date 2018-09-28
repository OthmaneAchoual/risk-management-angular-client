import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChoiceService } from '../../../services/choice.service';
import { MatDialogRef } from '@angular/material';
import { types as ts } from '../../../shared/choice-categories';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-choice-add',
  templateUrl: './choice-add.component.html',
  styleUrls: ['./choice-add.component.scss']
})
export class ChoiceAddComponent implements OnInit {

  types = ts;

  constructor(
    private service: ChoiceService,
    private login: LoginService,
    // private router: Router,
    private dialogRef: MatDialogRef<ChoiceAddComponent>
  ) { }

  choiceForm = new FormGroup({
    'label': new FormControl('', [
      Validators.required
    ]),
    'category': new FormControl('', [
      Validators.required
    ])
  });

  ngOnInit() {
  }

  addChoice() {
    this.service.addChoice(this.choiceForm.value).subscribe(
      data => this.dialogRef.close(data),
      err => {
        if (err.status === 401) {
          this.login.updateSession();
        }
        this.dialogRef.close(null);
      }
    );
  }

}
