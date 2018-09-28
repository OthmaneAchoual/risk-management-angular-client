import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Location } from '../../../models/location';
import { MyErrorStateMatcher } from '../../../shared/custom-err-state-matcher';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocationService } from '../../../services/location.service';
import { Observable } from 'rxjs';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.scss']
})
export class LocationEditComponent implements OnInit {

  locationForm = new FormGroup({
    'ID': new FormControl(this.location.ID, [
      Validators.required
    ]),
    'code': new FormControl(this.location.code, [
      Validators.required
    ]),
    'title': new FormControl(this.location.title, [
      Validators.required
    ]),
    'description': new FormControl(this.location.description, [
      Validators.required
    ]),
    'root': new FormControl((this.location.root && this.location.root.ID) || '', [])
  });

  matcher = new MyErrorStateMatcher();

  locs$: Observable<Location[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public location: Location,
    private service: LocationService,
    private login: LoginService,
    private dialogRef: MatDialogRef<LocationEditComponent>
  ) { }

  ngOnInit() {
    this.locs$ = this.service.locations;
    this.service.loadAll();
  }

  editLocation() {
    this.service.editLocation(this.locationForm.value).subscribe(
      loc => this.dialogRef.close(loc),
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
