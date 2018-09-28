import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { StaffService } from '../../../services/staff.service';
import { WorkContextService } from '../../../services/work-context.service';
import { Observable, Subject } from 'rxjs';
import { WorkContext } from '../../../models/work-context';
import { MatDialogRef } from '@angular/material';
import { User } from '../../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../../../services/login.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-staff-add',
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.scss']
})
export class StaffAddComponent implements OnInit {

  wcs: Observable<WorkContext[]>;
  staff$: Observable<User[]>;


  error = new Subject<HttpErrorResponse>();

  constructor(
    private service: StaffService,
    private login: LoginService,
    private wcService: WorkContextService,
    private dialogRef: MatDialogRef<StaffAddComponent>
  ) { }

  staffForm = new FormGroup(
    {
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'phone': new FormControl('+32', [
        Validators.required,
        Validators.pattern('^((\\+32)|0)([0-9]{9}|[0-9]{8})$')
      ]),
      'firstname': new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-ZàâéèêôùûçÀÂÉÈÔÙÛÇ\-]+$')
      ]),
      'lastname': new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-ZàâéèêôùûçÀÂÉÈÔÙÛÇ\-]+$')
      ]),
      'manager': new FormControl('', [])
    }
  );

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.wcs = this.wcService.contexts;
    this.wcService.loadAll();

    this.staff$ = this.service.staff;
    this.service.loadAll(this.error);
  }

  addUser() {
    this.service.addUser(this.staffForm.value).subscribe(
      user => this.dialogRef.close(user),
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
