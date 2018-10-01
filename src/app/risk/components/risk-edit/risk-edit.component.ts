import { Component, OnInit, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MyErrorStateMatcher } from '../../../shared/custom-err-state-matcher';
import { RiskService } from '../../../services/risk.service';
import { Observable } from 'rxjs';
import { Risk } from '../../../models/risk';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ChoiceService } from '../../../services/choice.service';
import { Choice } from '../../../models/choice';
import { map } from 'rxjs/operators';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-risk-edit',
  templateUrl: './risk-edit.component.html',
  styleUrls: ['./risk-edit.component.scss']
})
export class RiskEditComponent implements OnInit, AfterViewInit {

  @ViewChild('description') description;
  risk$: Observable<Risk>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Risk,
    private dialogRef: MatDialogRef<RiskEditComponent>,
    private service: RiskService,
    private choiceService: ChoiceService,
    private login: LoginService
  ) { }

  options = {
    placeholderText: 'Description',
    heightMin: 190
  };

  risks: Observable<Risk[]>;
  choices: Observable<Choice[]>;

  matcher = new MyErrorStateMatcher();
  riskForm = new FormGroup(
    {
      'ID': new FormControl(this.data.ID || '', [
        Validators.required
      ]),
      'title': new FormControl(this.data.title || '', [
        Validators.required
      ]),
      'reference': new FormControl(this.data.reference || '', [
        Validators.required
      ]),
      'type': new FormControl(this.data.type ? this.data.type.ID : '', [
        Validators.required
      ]),
      'description': new FormControl(this.data.description || '', [
        Validators.required
      ]),
      'root': new FormControl(this.data.root ? this.data.root.ID : '', [])
    }
  );

  ngOnInit() {
    this.risks = this.service.risks;
    this.service.loadAll();

    this.choices = this.choiceService.choices.pipe(
      map(choices => choices.filter(choice => choice.category === 'RISK_TYPE'))
    );
    this.choiceService.loadAll();
  }

  ngAfterViewInit() {
    (this.description.nativeElement.getElementsByClassName('pell-content')[0]).innerHTML = this.data.description;
  }

  editRisk() {
    console.log(this.riskForm.value);
    this.service.updateRisk(this.riskForm.value).subscribe(
      res => this.dialogRef.close(res),
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

  handleDescription(html) {
    this.riskForm.get('description').setValue(html);
  }

}
