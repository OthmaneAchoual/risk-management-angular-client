import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { StaffService } from '../../../services/staff.service';
import { User } from '../../../models/user';
import { LoginService } from '../../../services/login.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private dialogRef: MatDialogRef<EditStaffComponent>,
    private service: StaffService,
    private login: LoginService,
  ) { }

  person$: Observable<User>;
  staff$: Observable<User[]>;

  error = new Subject<HttpErrorResponse>();

  staffForm = new FormGroup(
    {
      'ID': new FormControl(this.data.ID || ''),
      'email': new FormControl(this.data.email || '', [
        Validators.required,
        Validators.email
      ]),
      'phone': new FormControl(this.data.phone || '+32', [
        Validators.required,
        Validators.pattern('^((\\+32)|0)([0-9]{9}|[0-9]{8})$')
      ]),
      'firstname': new FormControl(this.data.firstname || '', [
        Validators.required,
        Validators.pattern('^[a-zA-ZàâéèêôùûçÀÂÉÈÔÙÛÇ\-]+$')
      ]),
      'lastname': new FormControl(this.data.lastname || '', [
        Validators.required,
        Validators.pattern('^[a-zA-ZàâéèêôùûçÀÂÉÈÔÙÛÇ\-]+$')
      ]),
      'manager': new FormControl('')
    }
  );

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.staff$ = this.service.staff.pipe(
      map(staff => staff.filter(agent => agent.ID !== this.data.ID))
    );
    this.staff$.subscribe(
      () => this.data.manager && this.staffForm.get('manager').setValue(this.data.manager.ID)
    );
    this.service.loadAll(this.error);
  }

  edit() {
    this.service.editUser(this.staffForm.value).subscribe(
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
