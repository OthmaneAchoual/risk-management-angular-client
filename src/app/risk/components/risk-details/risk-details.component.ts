import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Risk } from '../../../models/risk';
import { RiskService } from '../../../services/risk.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConfirmDeletionComponent } from '../../../shared/confirm-deletion/confirm-deletion.component';
import { RiskEditComponent } from '../risk-edit/risk-edit.component';
import { ChoiceService } from '../../../services/choice.service';
import { Choice } from '../../../models/choice';

@Component({
  selector: 'app-risk-details',
  templateUrl: './risk-details.component.html',
  styleUrls: ['./risk-details.component.scss']
})
export class RiskDetailsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public risk: Risk,
    private dialogRef: MatDialogRef<RiskDetailsComponent>,
    private route: ActivatedRoute,
    private router: Router,
    private service: RiskService,
    private choiceService: ChoiceService,
    private dialog: MatDialog
  ) { }

  risk$: Observable<Risk>;
  root$: Observable<Risk>;
  risk$$ = new Subject<Risk>();
  loading = true;

  ngOnInit() {
    this.root$ = this.risk.root && this.service.getById(this.risk.root.__KEY);
  }

  deleteRisk(risk: Risk) {

    const dialogRef = this.dialog.open(ConfirmDeletionComponent, {
      width: '500px',
      data: {
        item: risk.reference
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.service.deleteRisk(risk.ID).subscribe(
            _ => this.router.navigate(['/risks'])
          );
        }
      }
    );
  }

  editRisk(risk: Risk) {

    const dialogRef = this.dialog.open(RiskEditComponent, {
      width: '80%',
      data: risk
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.risk$$.next(result);
        }
      }
    );
  }

  close() {
    this.dialogRef.close(null);
  }

}
