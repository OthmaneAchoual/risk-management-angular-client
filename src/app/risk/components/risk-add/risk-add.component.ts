import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../../shared/custom-err-state-matcher';
import { RiskService } from '../../../services/risk.service';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Risk } from '../../../models/risk';
import { Choice } from '../../../models/choice';
import { ChoiceService } from '../../../services/choice.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-risk-add',
  templateUrl: './risk-add.component.html',
  styleUrls: ['./risk-add.component.scss']
})
export class RiskAddComponent implements OnInit {

  constructor(
    private service: RiskService,
    private choiceService: ChoiceService,
    private login: LoginService,
    private dialogRef: MatDialogRef<RiskAddComponent>
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
      'title': new FormControl('', [
        Validators.required
      ]),
      'reference': new FormControl('', [
        Validators.required
      ]),
      'type': new FormControl('', [
        Validators.required
      ]),
      'description': new FormControl('', [
        Validators.required
      ]),
      'root': new FormControl('', [])
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

  addRisk() {
    this.service.addRisk(this.riskForm.value).then(
      created => {
        this.dialogRef.close(created);
      }
    ).catch(
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
