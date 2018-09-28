import { Component, OnInit } from '@angular/core';
import { WorkContext } from '../../../models/work-context';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { WorkContextService } from '../../../services/work-context.service';

import { orderBy } from 'lodash';

import { ConfirmDeletionComponent } from '../../../shared/confirm-deletion/confirm-deletion.component';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
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
import { WorkContextDetailsDialogComponent } from '../work-context-details-dialog/work-context-details-dialog.component';
import { Location } from '../../../models/location';
import { LocationService } from '../../../services/location.service';
import { LocationDetailComponent } from '../../../location/components/location-detail/location-detail.component';
import { Equipment } from '../../../models/equipment';
import { EquipmentDetailComponent } from '../../../equipment/components/equipment-detail/equipment-detail.component';
import { EquipmentService } from '../../../services/equipment.service';

@Component({
  selector: 'app-work-context-details',
  templateUrl: './work-context-details.component.html',
  styleUrls: ['./work-context-details.component.scss']
})
export class WorkContextDetailsComponent implements OnInit {

  context$: Observable<WorkContext>;
  relatedContexts$: Observable<WorkContext[]>;
  types$: Observable<Choice[]>;
  risks$: Observable<Risk[]>;
  agents$: Observable<User[]>;
  docs$: Observable<Document[]>;
  eqs$: Observable<Equipment[]>;
  locs$: Observable<Location[]>;

  constructor(
    private route: ActivatedRoute,
    private service: WorkContextService,
    private choiceService: ChoiceService,
    private riskService: RiskService,
    private staffService: StaffService,
    private documentService: DocumentService,
    private locationService: LocationService,
    private equipmentService: EquipmentService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.context$ = this.route.params.pipe(
      switchMap(params => this.service.getContext(params.id))
    );
    this.relatedContexts$ = this.context$.pipe(
      switchMap(context => this.service.getContextsForContext(context.ID))
    );
    this.types$ = this.context$.pipe(
      switchMap(context => this.choiceService.getChoicesForContext(context.ID))
    );
    this.risks$ = this.context$.pipe(
      switchMap(context => this.riskService.getRisksForContext(context.ID))
    );
    this.agents$ = this.context$.pipe(
      switchMap(context => this.staffService.getAgentsForContext(context.ID))
    );
    this.eqs$ = this.context$.pipe(
      switchMap(context => this.equipmentService.getEquipmentsForContext(context.ID))
    );
    this.docs$ = this.context$.pipe(
      switchMap(context => this.documentService.getDocumentsForContext(context.ID)),
      map(docs => orderBy(docs, ['title'], ['desc']))
    );
    this.locs$ = this.context$.pipe(
      switchMap(context => this.locationService.getLocationsForContext(context.ID)),
      map(locs => orderBy(locs, ['title'], ['desc']))
    );
  }

  delete(context: WorkContext) {
    const dialogRef = this.dialog.open(ConfirmDeletionComponent, {
      width: '450px',
      data: {
        item: context.name
      }
    });

    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.service.deleteContext(context.ID).subscribe(
            res => this.router.navigate(['/workcontexts'])
          );
        }
      }
    );
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
    this.dialog.open(LocationDetailComponent, {
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

  displayContext(ctx: WorkContext) {
    this.dialog.open(WorkContextDetailsDialogComponent, {
      width: '80%',
      data: ctx
    });
  }

}
