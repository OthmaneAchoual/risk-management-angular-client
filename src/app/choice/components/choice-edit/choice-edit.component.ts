import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { types } from '../../../shared/choice-categories';
import { ChoiceService } from '../../../services/choice.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Choice } from '../../../models/choice';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-choice-edit',
  templateUrl: './choice-edit.component.html',
  styleUrls: ['./choice-edit.component.scss']
})
export class ChoiceEditComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public choice: Choice,
    private dialogRef: MatDialogRef<ChoiceEditComponent>,
    private service: ChoiceService,
    private login: LoginService
  ) { }

  types = types;

  choiceForm = new FormGroup({
    'choice': new FormControl(this.choice.label, [
      Validators.required
    ]),
    'category': new FormControl(this.choice.category, [
      Validators.required
    ])
  });

  ngOnInit() {
  }

  editChoice() {
    return this.service.updateChoice({...this.choiceForm.value, ID: this.choice.ID}).subscribe(
      data => this.dialogRef.close(data),
      err => {
        if (err.status === 401) {
          this.login.updateSession();
        }
        this.dialogRef.close(null);
      }
    );
  }

  cancel() {
    this.dialogRef.close(null);
  }

}
