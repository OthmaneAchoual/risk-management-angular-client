import { Component, OnInit, Inject } from '@angular/core';
import { WorkContext } from '../../../models/work-context';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { WorkContextService } from '../../../services/work-context.service';

import { orderBy } from 'lodash';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChoiceService } from '../../../services/choice.service';
import { Choice } from '../../../models/choice';
import { Risk } from '../../../models/risk';
import { RiskService } from '../../../services/risk.service';
import { User } from '../../../models/user';
import { StaffService } from '../../../services/staff.service';
import { RiskDetailsComponent } from '../../../risk/components/risk-details/risk-details.component';
import { DocumentService } from '../../../services/document.service';
import { Document } from '../../../models/document';
import { ChoiceDetailComponent } from '../../../choice/components/choice-detail/choice-detail.component';
import { StaffDetailComponent } from '../../../staff/components/staff-detail/staff-detail.component';
import { DocumentDetailComponent } from '../../../document/components/document-detail/document-detail.component';
import { Router } from '@angular/router';
import { Location } from '../../../models/location';
import { LocationService } from '../../../services/location.service';
import { Equipment } from '../../../models/equipment';
import { EquipmentService } from '../../../services/equipment.service';
import { EquipmentDetailComponent } from '../../../equipment/components/equipment-detail/equipment-detail.component';

@Component({
  selector: 'app-work-context-details-dialog',
  templateUrl: './work-context-details-dialog.component.html',
  styleUrls: ['./work-context-details-dialog.component.scss']
})
export class WorkContextDetailsDialogComponent implements OnInit {

  context$: Observable<WorkContext>;
  relatedContexts$: Observable<WorkContext[]>;
  types$: Observable<Choice[]>;
  risks$: Observable<Risk[]>;
  agents$: Observable<User[]>;
  docs$: Observable<Document[]>;
  eqs$: Observable<Equipment[]>;
  locs$: Observable<Location[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public context: WorkContext,
    private service: WorkContextService,
    private choiceService: ChoiceService,
    private riskService: RiskService,
    private staffService: StaffService,
    private documentService: DocumentService,
    private locationService: LocationService,
    private equipmentService: EquipmentService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<WorkContextDetailsDialogComponent>,
    private router: Router
  ) { }

  ngOnInit() {
    // this.relatedContexts$ = this.service.getContextsForContext(this.context.ID);

    // this.types$ = this.choiceService.getChoicesForContext(this.context.ID);

    // this.risks$ = this.riskService.getRisksForContext(this.context.ID);

    // this.eqs$ = this.equipmentService.getEquipmentsForContext(this.context.ID);

    // this.agents$ = this.staffService.getAgentsForContext(this.context.ID);

    // this.docs$ = this.documentService.getDocumentsForContext(this.context.ID).pipe(
    //   map(docs => orderBy(docs, ['title'], ['desc']))
    // );

    // this.locs$ = this.locationService.getLocationsForContext(this.context.ID).pipe(
    //   map(locs => orderBy(locs, ['title'], ['desc']))
    // );
  }

  displayRisk(risk: Risk) {
    this.dialog.open(RiskDetailsComponent, {
      width: '80%',
      data: risk
    });
  }

  displayChoice(type: Choice) {
    this.dialog.open(ChoiceDetailComponent, {
      width: '80%',
      data: type
    });
  }

  displayAgent(agent: User) {
    this.dialog.open(StaffDetailComponent, {
      width: '80%',
      data: agent
    });
  }

  displayDocument(doc: Document) {
    this.dialog.open(DocumentDetailComponent, {
      width: '80%',
      data: doc
    });
  }

  displayLocation(loc: Location) {
    this.dialog.open(DocumentDetailComponent, {
      width: '80%',
      data: loc
    });
  }

  displayEquipment(eq: Equipment) {
    this.dialog.open(EquipmentDetailComponent, {
      width: '80%',
      data: eq
    });
  }

  goToContext(id) {
    this.router.navigate(['/workcontexts', id]);
    this.dialogRef.close(null);
  }

}
