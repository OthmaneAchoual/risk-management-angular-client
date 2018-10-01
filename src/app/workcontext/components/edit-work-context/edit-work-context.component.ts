import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WorkContext } from '../../../models/work-context';
import { MAT_DIALOG_DATA, MatDialogRef, MatAutocompleteSelectedEvent } from '@angular/material';
import { MyErrorStateMatcher } from '../../../shared/custom-err-state-matcher';
import { Observable, Subject, merge } from 'rxjs';
import { Choice } from '../../../models/choice';
import { User } from '../../../models/user';
import { Risk } from '../../../models/risk';
import { Document } from '../../../models/document';
import { Location } from '../../../models/location';
import { ChoiceService } from '../../../services/choice.service';
import { StaffService } from '../../../services/staff.service';
import { RiskService } from '../../../services/risk.service';
import { DocumentService } from '../../../services/document.service';
import { WorkContextService } from '../../../services/work-context.service';
import { HttpErrorResponse } from '@angular/common/http';
import { map, startWith, switchMap } from 'rxjs/operators';

import { orderBy } from 'lodash';
import { LocationService } from '../../../services/location.service';
import { EquipmentService } from '../../../services/equipment.service';
import { Equipment } from '../../../models/equipment';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-edit-work-context',
  templateUrl: './edit-work-context.component.html',
  styleUrls: ['./edit-work-context.component.scss']
})
export class EditWorkContextComponent implements OnInit, AfterViewInit {

  @ViewChild('wcInput')
  wcInput;
  @ViewChild('staffInput')
  staffInput;
  @ViewChild('docInput')
  docInput;
  @ViewChild('locInput')
  locInput;
  @ViewChild('eqInput')
  eqInput;
  @ViewChild('workInput')
  workInput;

  // Pell boxes
  @ViewChild('short') short;
  @ViewChild('full') full;

  constructor(
    @Inject(MAT_DIALOG_DATA) public curr: WorkContext,
    private dialogRef: MatDialogRef<EditWorkContextComponent>,
    private login: LoginService,
    private choiceService: ChoiceService,
    private staffService: StaffService,
    private riskService: RiskService,
    private documentService: DocumentService,
    private locationService: LocationService,
    private equipmentService: EquipmentService,
    private service: WorkContextService
  ) { }

  refresh = new Subject<any>();
  staffRefresh = new Subject<any>();
  docRefresh = new Subject<any>();
  locRefresh = new Subject<any>();
  eqRefresh = new Subject<any>();
  workRefresh = new Subject<any>();

  choices: Observable<Choice[]>;
  staff: Observable<User[]>;
  risks: Observable<Risk[]>;
  docs: Observable<Document[]>;
  locs: Observable<Location[]>;
  eqs: Observable<Equipment[]>;
  // wcs: Observable<WorkContext[]>;

  myControl = new FormControl();
  staffControl = new FormControl();
  docControl = new FormControl();
  locControl = new FormControl();
  eqControl = new FormControl();
  workControl = new FormControl();

  filteredOptions: Observable<any[]>;
  filteredStaffOptions: Observable<any[]>;
  filteredDocsOptions: Observable<any[]>;
  filteredLocsOptions: Observable<any[]>;
  filteredEqsOptions: Observable<any[]>;
  // filteredWorkOptions: Observable<any[]>;

  error = new Subject<HttpErrorResponse>();

  matcher = new MyErrorStateMatcher();
  wcForm = new FormGroup({
    'code': new FormControl(this.curr.code, [
      Validators.required
    ]),
    'name': new FormControl(this.curr.name, [
      Validators.required
    ]),
    'types': new FormControl([], [
      Validators.required
    ]),
    'shortDescription': new FormControl(this.curr.shortDescription, [
      Validators.required
    ]),
    'fullDescription': new FormControl(this.curr.fullDescription, [
      Validators.required
    ]),
    'risks': new FormControl([], [
      Validators.required
    ]),
    'users': new FormControl([], [
      Validators.required
    ]),
    // 'wcIds': new FormControl([]),
    'documents': new FormControl([], [
      Validators.required
    ]),
    'locations': new FormControl([], [
      Validators.required
    ]),
    'equipments': new FormControl([], [
      Validators.required
    ])
  });

  ngOnInit() {
  //   this.filteredWorkOptions = merge(this.workControl.valueChanges, this.workRefresh).pipe(
  //     startWith<string | WorkContext>(''),
  //     map(val => typeof val === 'string' ? val : val.code),
  //     switchMap(val => this.wcs.pipe(
  //       map(ctxs => ctxs.filter(ctx => ctx.name.startsWith(val) || ctx.code.startsWith(val))),
  //       map(ctxs => ctxs.map(ctx => ({ ...ctx, selected: (this.wcForm.get('wcIds').value as Array<string>).includes(ctx.ID)})))
  //     )
  //   )
  // );

    this.filteredDocsOptions = merge(this.docControl.valueChanges, this.docRefresh).pipe(
      startWith<string | Document>(''),
      map(val => typeof val === 'string' ? val : val.title),
      switchMap(val => this.docs.pipe(
        map(docs => docs.filter(doc => doc.title.startsWith(val) || doc.code.startsWith(val))),
        map(docs => docs.map(doc => ({ ...doc, selected: (this.wcForm.get('documents').value as Array<string>).includes(doc.ID)})))
      )
    )
  );

  this.filteredLocsOptions = merge(this.locControl.valueChanges, this.locRefresh).pipe(
    startWith<string | Location>(''),
    map(val => typeof val === 'string' ? val : val.title),
    switchMap(val => this.locs.pipe(
      map(locs => locs.filter(loc => loc.title.startsWith(val) || loc.code.startsWith(val))),
      map(locs => locs.map(loc => ({ ...loc, selected: (this.wcForm.get('locations').value as Array<string>).includes(loc.ID)})))
    )
  )
);

this.filteredEqsOptions = merge(this.eqControl.valueChanges, this.eqRefresh).pipe(
  startWith<string | Equipment>(''),
  map(val => typeof val === 'string' ? val : val.title),
  switchMap(val => this.eqs.pipe(
    map(eqs => eqs.filter(eq => eq.title.startsWith(val) || eq.code.startsWith(val))),
    map(eqs => eqs.map(eq => ({ ...eq, selected: (this.wcForm.get('equipments').value as Array<string>).includes(eq.ID)})))
  )
)
);

    this.filteredStaffOptions = merge(this.staffControl.valueChanges, this.staffRefresh).pipe(
      startWith<string | User>(''),
      map(val => typeof val === 'string' ? val : val.lastname),
      switchMap(val => this.staff.pipe(
        map(staff => staff.filter(agent => agent.firstname.startsWith(val) || agent.lastname.startsWith(val))),
        map(staff => staff.map(agent => ({ ...agent, selected: (this.wcForm.get('users').value as Array<string>).includes(agent.ID)})))
      )
    )
  );

    this.filteredOptions = merge(this.myControl.valueChanges, this.refresh).pipe(
      startWith<string | Risk>(''),
      map(val => typeof val === 'string' ? val : val.title),
      switchMap(val => this.risks.pipe(
        map(risks => risks.filter(risk => risk.title.startsWith(val))),
        map(risks => risks.map(risk => ({ ...risk, selected: (this.wcForm.get('risks').value as Array<string>).includes(risk.ID)})))
      )
    )
  );

    this.choices = this.choiceService.choices.pipe(
      map(choices => choices.filter(choice => choice.category === 'WORK_CONTEXT_TYPE'))
    );

    this.choiceService.loadAll();

    this.docs = this.documentService.documents.pipe(
      map(docs => orderBy(docs, [doc => doc.title.toLowerCase()], ['asc']))
    );
    this.documentService.loadAll();

    this.locs = this.locationService.locations.pipe(
      map(locs => orderBy(locs, [loc => loc.title.toLowerCase()], ['asc']))
    );
    this.locationService.loadAll();

    this.eqs = this.equipmentService.equipment.pipe(
      map(eqs => orderBy(eqs, [eq => eq.title.toLowerCase()], ['asc']))
    );
    this.equipmentService.loadAll();

    this.risks = this.riskService.risks;
    this.riskService.loadAll();

    // this.wcs = this.service.contexts.pipe(
    //   map(ctxs => ctxs.filter(ctx => ctx.ID !== this.curr.ID))
    // );
    // this.service.loadAll();

    this.staff = this.staffService.staff;
    this.staffService.loadAll(this.error);

    // this.riskService.getRisksForContext(this.curr.ID).subscribe(
    //   risks => {
        this.wcForm.get('risks').setValue(this.curr.risks.map(risk => risk.ID));
        // this.refresh.next('');
    //   }
    // );

    // this.staffService.getAgentsForContext(this.curr.ID).subscribe(
    //   staff => {
        this.wcForm.get('users').setValue(this.curr.users.map(agent => agent.ID));
        // this.staffRefresh.next('');
    //   }
    // );

    // this.service.getContextsForContext(this.curr.ID).subscribe(
    //   wcs => {
    //     this.wcForm.get('wcIds').setValue(wcs.map(wc => wc.ID));
    //     this.workRefresh.next('');
    //   }
    // );

    // this.locationService.getLocationsForContext(this.curr.ID).subscribe(
    //   locs => {
        this.wcForm.get('locations').setValue(this.curr.locations.map(loc => loc.ID));
    //     this.locRefresh.next('');
    //   }
    // );

    // this.equipmentService.getEquipmentsForContext(this.curr.ID).subscribe(
    //   eqs => {
        this.wcForm.get('equipments').setValue(this.curr.equipments.map(eq => eq.ID));
    //     this.eqRefresh.next('');
    //   }
    // );

    // this.documentService.getDocumentsForContext(this.curr.ID).subscribe(
    //   docs => {
        this.wcForm.get('documents').setValue(this.curr.documents.map(doc => doc.ID));
    //     this.docRefresh.next('');
    //   }
    // );

    // this.choiceService.getChoicesForContext(this.curr.ID).subscribe(
      // types => {
        this.wcForm.get('types').setValue(this.curr.types.map(type => type.ID));
      // }
    // );
  }

  ngAfterViewInit() {
    // Initialize the pell boxes with the corresponding context data
    (this.short.nativeElement.getElementsByClassName('pell-content')[0]).innerHTML = this.curr.shortDescription;
    (this.full.nativeElement.getElementsByClassName('pell-content')[0]).innerHTML = this.curr.fullDescription;
  }

  submit() {
    this.service.updateWorkContext({...this.wcForm.value, ID: this.curr.ID }).subscribe(
      data => this.dialogRef.close(data),
      err => {
        if (err.status === 401) {
          this.login.updateSession();
        }
        this.dialogRef.close(null);
      }
    );
  }

  dismiss() {
    this.dialogRef.close(null);
  }

  displayFn(risk?: Risk): string | undefined {
    return risk ? risk.title : undefined;
  }

  displayStaffFn(agent?: User): string | undefined {
    return agent ? agent.firstname : undefined;
  }

  displayDocsFn(doc?: Document): string | undefined {
    return doc ? `${doc.title} - ${doc.code}` : undefined;
  }

  displayLocsFn(loc?: Location): string | undefined {
    return loc ? `${loc.title} - ${loc.code}` : undefined;
  }

  displayEqsFn(eq?: Equipment): string | undefined {
    return eq ? `${eq.title} - ${eq.code}` : undefined;
  }

  displayWorkFn(ctx?: WorkContext): string | undefined {
    return ctx ? `${ctx.name} - ${ctx.code}` : undefined;
  }

  onSelect(e: MatAutocompleteSelectedEvent) {
    this.myControl.setValue('');
    this.wcInput.nativeElement.blur();
    const ids = this.wcForm.get('risks').value;
    const index = ids.indexOf(e.option.value.ID);
    console.log(index);
    this.wcForm.get('risks').setValue(
      index === -1 ? (ids as Array<string>).concat(e.option.value.ID) : (ids as Array<string>).filter(id => id !== e.option.value.ID)
    );
    this.refresh.next('');
  }

  onSelectStaff(e: MatAutocompleteSelectedEvent) {
    this.staffControl.setValue('');
    this.staffInput.nativeElement.blur();
    const ids = this.wcForm.get('users').value;
    const index = ids.indexOf(e.option.value.ID);
    this.wcForm.get('users').setValue(
      index === -1 ? (ids as Array<string>).concat(e.option.value.ID) : (ids as Array<string>).filter(id => id !== e.option.value.ID)
    );
    this.staffRefresh.next('');
  }

  onSelectDoc(e: MatAutocompleteSelectedEvent) {
    this.docControl.setValue('');
    this.docInput.nativeElement.blur();
    const ids = this.wcForm.get('documents').value;
    const index = ids.indexOf(e.option.value.ID);
    this.wcForm.get('documents').setValue(
      index === -1 ? (ids as Array<string>).concat(e.option.value.ID) : (ids as Array<string>).filter(id => id !== e.option.value.ID)
    );
    this.docRefresh.next('');
  }

  onSelectLoc(e: MatAutocompleteSelectedEvent) {
    this.locControl.setValue('');
    this.locInput.nativeElement.blur();
    const ids = this.wcForm.get('locations').value;
    const index = ids.indexOf(e.option.value.ID);
    this.wcForm.get('locations').setValue(
      index === -1 ? (ids as Array<string>).concat(e.option.value.ID) : (ids as Array<string>).filter(id => id !== e.option.value.ID)
    );
    this.locRefresh.next('');
  }

  onSelectEq(e: MatAutocompleteSelectedEvent) {
    this.eqControl.setValue('');
    this.eqInput.nativeElement.blur();
    const ids = this.wcForm.get('equipments').value;
    const index = ids.indexOf(e.option.value.ID);
    this.wcForm.get('equipments').setValue(
      index === -1 ? (ids as Array<string>).concat(e.option.value.ID) : (ids as Array<string>).filter(id => id !== e.option.value.ID)
    );
    this.eqRefresh.next('');
  }

  // onSelectWork(e: MatAutocompleteSelectedEvent) {
  //   this.workControl.setValue('');
  //   this.workInput.nativeElement.blur();
  //   const ids = this.wcForm.get('wcIds').value;
  //   const index = ids.indexOf(e.option.value.ID);
  //   this.wcForm.get('wcIds').setValue(
  //     index === -1 ? (ids as Array<string>).concat(e.option.value.ID) : (ids as Array<string>).filter(id => id !== e.option.value.ID)
  //   );
  //   this.docRefresh.next('');
  // }

  handleShortDesc(html) {
    this.wcForm.get('shortDescription').setValue(html);
  }

  handleFullDesc(html) {
    this.wcForm.get('fullDescription').setValue(html);
  }

}
