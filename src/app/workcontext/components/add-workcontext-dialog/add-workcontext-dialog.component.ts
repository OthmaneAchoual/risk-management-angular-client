import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StaffService } from '../../../services/staff.service';
import { Observable, Subject, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { Risk } from '../../../models/risk';
import { RiskService } from '../../../services/risk.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChoiceService } from '../../../services/choice.service';
import { Choice } from '../../../models/choice';
import { MatDialogRef, MatAutocompleteSelectedEvent } from '@angular/material';
import { MyErrorStateMatcher } from '../../../staff/components/staff-add/staff-add.component';
import { WorkContext } from '../../../models/work-context';
import { WorkContextService } from '../../../services/work-context.service';
import { Document } from '../../../models/document';
import { Location } from '../../../models/location';
import { DocumentService } from '../../../services/document.service';
import { startWith, switchMap } from 'rxjs/operators';
import { LocationService } from '../../../services/location.service';
import { Equipment } from '../../../models/equipment';
import { EquipmentService } from '../../../services/equipment.service';

@Component({
  selector: 'app-add-workcontext-dialog',
  templateUrl: './add-workcontext-dialog.component.html',
  styleUrls: ['./add-workcontext-dialog.component.scss']
})
export class AddWorkcontextDialogComponent implements OnInit {

  staff: Observable<User[]>;
  risks: Observable<Risk[]>;
  docs: Observable<Document[]>;
  locs: Observable<Location[]>;
  eqs: Observable<Equipment[]>;
  choices: Observable<Choice[]>;
  wcs: Observable<WorkContext[]>;
  error$ = new Subject<HttpErrorResponse>();

  refresh = new Subject<any>();
  staffRefresh = new Subject<any>();
  docRefresh = new Subject<any>();
  locRefresh = new Subject<any>();
  eqRefresh = new Subject<any>();
  workRefresh = new Subject<any>();

  @ViewChild('sd') sd: ElementRef;
  @ViewChild('fd') fd: ElementRef;
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

  wcForm = new FormGroup({
    'code': new FormControl('', [
      Validators.required
    ]),
    'name': new FormControl('', [
      Validators.required
    ]),
    'typeIds': new FormControl([], [
      Validators.required
    ]),
    'short_description': new FormControl('', [
      Validators.required
    ]),
    'full_description': new FormControl('', [
      Validators.required
    ]),
    'riskIds': new FormControl([], [
      Validators.required
    ]),
    'userIds': new FormControl([], [
      Validators.required
    ]),
    'wcIds': new FormControl([]),
    'docIds': new FormControl([], [
      Validators.required
    ]),
    'locIds': new FormControl([], [
      Validators.required
    ]),
    'eqIds': new FormControl([], [
      Validators.required
    ])
  });

  matcher = new MyErrorStateMatcher();

  myControl = new FormControl();
  staffControl = new FormControl();
  docControl = new FormControl();
  locControl = new FormControl();
  workControl = new FormControl();
  eqControl = new FormControl();

  filteredOptions: Observable<any[]>;
  filteredStaffOptions: Observable<any[]>;
  filteredDocsOptions: Observable<any[]>;
  filteredLocsOptions: Observable<any[]>;
  filteredEqsOptions: Observable<any[]>;
  filteredWorkOptions: Observable<any[]>;

  public sdOptions = {
    placeholderText: 'Short description',
    heightMin: 100,
    events: {
      'froalaEditor.focus' : (e, editor) => {
        this.wcForm.get('short_description').markAsTouched();
      }
    }
  };

  public fdOptions = {
    placeholderText: 'Full description',
    heightMin: 190,
    events: {
      'froalaEditor.focus' : (e, editor) => {
        this.wcForm.get('full_description').markAsTouched();
      }
    }
  };

  constructor(
    private service: WorkContextService,
    private staffService: StaffService,
    private riskService: RiskService,
    private choiceService: ChoiceService,
    private documentService: DocumentService,
    private locationService: LocationService,
    private equipmentService: EquipmentService,
    private dialogRef: MatDialogRef<AddWorkcontextDialogComponent>
  ) { }

  ngOnInit() {

    this.filteredWorkOptions = merge(this.workControl.valueChanges, this.workRefresh).pipe(
      startWith<string | WorkContext>(''),
      map(val => typeof val === 'string' ? val : val.code),
      switchMap(val => this.wcs.pipe(
        map(ctxs => ctxs.filter(ctx => ctx.name.startsWith(val) || ctx.code.startsWith(val))),
        map(ctxs => ctxs.map(ctx => ({ ...ctx, selected: (this.wcForm.get('wcIds').value as Array<string>).includes(ctx.ID)})))
      )
    )
  );

    this.filteredDocsOptions = merge(this.docControl.valueChanges, this.docRefresh).pipe(
      startWith<string | Document>(''),
      map(val => typeof val === 'string' ? val : val.title),
      switchMap(val => this.docs.pipe(
        map(docs => docs.filter(doc => doc.title.startsWith(val) || doc.code.startsWith(val))),
        map(docs => docs.map(doc => ({ ...doc, selected: (this.wcForm.get('docIds').value as Array<string>).includes(doc.ID)})))
      )
    )
  );

  this.filteredLocsOptions = merge(this.locControl.valueChanges, this.locRefresh).pipe(
    startWith<string | Location>(''),
    map(val => typeof val === 'string' ? val : val.title),
    switchMap(val => this.locs.pipe(
      map(locs => locs.filter(loc => loc.title.startsWith(val) || loc.code.startsWith(val))),
      map(locs => locs.map(loc => ({ ...loc, selected: (this.wcForm.get('locIds').value as Array<string>).includes(loc.ID)})))
    )
  )
);

this.filteredEqsOptions = merge(this.eqControl.valueChanges, this.eqRefresh).pipe(
  startWith<string | Equipment>(''),
  map(val => typeof val === 'string' ? val : val.title),
  switchMap(val => this.eqs.pipe(
    map(eqs => eqs.filter(eq => eq.title.startsWith(val) || eq.code.startsWith(val))),
    map(eqs => eqs.map(eq => ({ ...eq, selected: (this.wcForm.get('eqIds').value as Array<string>).includes(eq.ID)})))
  )
)
);

    this.filteredStaffOptions = merge(this.staffControl.valueChanges, this.staffRefresh).pipe(
      startWith<string | User>(''),
      map(val => typeof val === 'string' ? val : val.lastname),
      switchMap(val => this.staff.pipe(
        map(staff => staff.filter(agent => agent.firstname.startsWith(val) || agent.lastname.startsWith(val))),
        map(staff => staff.map(agent => ({ ...agent, selected: (this.wcForm.get('userIds').value as Array<string>).includes(agent.ID)})))
      )
    )
  );

    this.filteredOptions = merge(this.myControl.valueChanges, this.refresh).pipe(
      startWith<string | Risk>(''),
      map(val => typeof val === 'string' ? val : val.title),
      switchMap(val => this.risks.pipe(
        map(risks => risks.filter(risk => risk.title.startsWith(val))),
        map(risks => risks.map(risk => ({ ...risk, selected: (this.wcForm.get('riskIds').value as Array<string>).includes(risk.ID)})))
      )
    )
  );

    this.wcs = this.service.contexts;
    this.service.loadAll();

    this.staff = this.staffService.staff;
    this.staffService.loadAll(this.error$);

    this.risks = this.riskService.risks;
    this.riskService.loadAll();

    this.docs = this.documentService.documents;
    this.documentService.loadAll();

    this.locs = this.locationService.locations;
    this.locationService.loadAll();

    this.eqs = this.equipmentService.equipment;
    this.equipmentService.loadAll();

    this.choices = this.choiceService.choices.pipe(
      map(choices => choices.filter(choice => choice.category === 'WORK_CONTEXT_TYPE'))
    );
    this.choiceService.loadAll();
  }

  dismiss() {
    this.dialogRef.close(null);
  }

  submit() {
    this.dialogRef.close(this.wcForm.value);
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
    const ids = this.wcForm.get('riskIds').value;
    const index = ids.indexOf(e.option.value.ID);
    console.log(index);
    this.wcForm.get('riskIds').setValue(
      index === -1 ? (ids as Array<string>).concat(e.option.value.ID) : (ids as Array<string>).filter(id => id !== e.option.value.ID)
    );
    this.refresh.next('');
  }

  onSelectStaff(e: MatAutocompleteSelectedEvent) {
    this.staffControl.setValue('');
    this.staffInput.nativeElement.blur();
    const ids = this.wcForm.get('userIds').value;
    const index = ids.indexOf(e.option.value.ID);
    this.wcForm.get('userIds').setValue(
      index === -1 ? (ids as Array<string>).concat(e.option.value.ID) : (ids as Array<string>).filter(id => id !== e.option.value.ID)
    );
    this.staffRefresh.next('');
  }

  onSelectDoc(e: MatAutocompleteSelectedEvent) {
    this.docControl.setValue('');
    this.docInput.nativeElement.blur();
    const ids = this.wcForm.get('docIds').value;
    const index = ids.indexOf(e.option.value.ID);
    this.wcForm.get('docIds').setValue(
      index === -1 ? (ids as Array<string>).concat(e.option.value.ID) : (ids as Array<string>).filter(id => id !== e.option.value.ID)
    );
    this.docRefresh.next('');
  }

  onSelectLoc(e: MatAutocompleteSelectedEvent) {
    this.locControl.setValue('');
    this.locInput.nativeElement.blur();
    const ids = this.wcForm.get('locIds').value;
    const index = ids.indexOf(e.option.value.ID);
    this.wcForm.get('locIds').setValue(
      index === -1 ? (ids as Array<string>).concat(e.option.value.ID) : (ids as Array<string>).filter(id => id !== e.option.value.ID)
    );
    this.locRefresh.next('');
  }

  onSelectEq(e: MatAutocompleteSelectedEvent) {
    this.eqControl.setValue('');
    this.eqInput.nativeElement.blur();
    const ids = this.wcForm.get('eqIds').value;
    const index = ids.indexOf(e.option.value.ID);
    this.wcForm.get('eqIds').setValue(
      index === -1 ? (ids as Array<string>).concat(e.option.value.ID) : (ids as Array<string>).filter(id => id !== e.option.value.ID)
    );
    this.eqRefresh.next('');
  }

  onSelectWork(e: MatAutocompleteSelectedEvent) {
    this.workControl.setValue('');
    this.workInput.nativeElement.blur();
    const ids = this.wcForm.get('wcIds').value;
    const index = ids.indexOf(e.option.value.ID);
    this.wcForm.get('wcIds').setValue(
      index === -1 ? (ids as Array<string>).concat(e.option.value.ID) : (ids as Array<string>).filter(id => id !== e.option.value.ID)
    );
    this.docRefresh.next('');
  }

  handleShortDesc(html) {
    this.wcForm.get('short_description').setValue(html);
  }

  handleFullDesc(html) {
    this.wcForm.get('full_description').setValue(html);
  }
}
