import { Component, OnInit } from '@angular/core';
import { ChoiceService } from '../../../services/choice.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Choice } from '../../../models/choice';
import { MatDialog } from '@angular/material';
import { ChoiceAddComponent } from '../choice-add/choice-add.component';
import { LoginService } from '../../../services/login.service';
import { ChoiceDetailComponent } from '../choice-detail/choice-detail.component';
import { ConfirmDeletionComponent } from '../../../shared/confirm-deletion/confirm-deletion.component';
import { ChoiceEditComponent } from '../choice-edit/choice-edit.component';

@Component({
  selector: 'app-choice-list',
  templateUrl: './choice-list.component.html',
  styleUrls: ['./choice-list.component.scss']
})
export class ChoiceListComponent implements OnInit {

  choices: Observable<Choice[]>;
  loggedIn: Observable<boolean>;

  riskChoices: Observable<Choice[]>;
  workContextChoices: Observable<Choice[]>;
  equipmentChoices: Observable<Choice[]>;
  documentChoices: Observable<Choice[]>;

  constructor(
    private service: ChoiceService,
    private loginService: LoginService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loggedIn = this.loginService.loggedIn;

    this.choices = this.service.choices;
    this.riskChoices = this.choices.pipe(
      map(choices => choices.filter(choice => choice.category === 'RISK_TYPE'))
    );
    this.workContextChoices = this.choices.pipe(
      map(choices => choices.filter(choice => choice.category === 'WORK_CONTEXT_TYPE'))
    );
    this.equipmentChoices = this.choices.pipe(
      map(choices => choices.filter(choice => choice.category === 'EQUIPMENT_TYPE'))
    );
    this.documentChoices = this.choices.pipe(
      map(choices => choices.filter(choice => choice.category === 'DOCUMENT_TYPE'))
    );
    this.service.loadAll();
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(ChoiceAddComponent, {
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.service.loadAll();
        }
      }
    );
  }

  displayDetail(choice) {
    this.dialog.open(ChoiceDetailComponent, {
      width: '80%',
      data: choice
    });
  }

  deleteChoice(choice: Choice) {
    const ref = this.dialog.open(ConfirmDeletionComponent, {
      width: '500px',
      data: {
        item: choice.label
      }
    });

    ref.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.service.deleteChoice(choice.ID).subscribe(
            res => this.service.loadAll(),
            err => err.status === 401 && this.loginService.updateSession()
          );
        }
      }
    );
  }

  editChoice(choice: Choice) {
    const ref = this.dialog.open(ChoiceEditComponent, {
      width: '80%',
      data: choice
    });

    ref.afterClosed().subscribe(
      data => {
        if (data) {
          this.service.loadAll();
        }
      }
    );
  }

}
