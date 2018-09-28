import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MyErrorStateMatcher } from '../../../shared/custom-err-state-matcher';
import { LocationService } from '../../../services/location.service';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Location } from '../../../models/location';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.scss']
})
export class LocationAddComponent implements OnInit {

  locs$: Observable<Location[]>;

  constructor(
    private dialogRef: MatDialogRef<LocationAddComponent>,
    private service: LocationService,
    private login: LoginService
  ) { }

  locationForm = new FormGroup({
    'code': new FormControl('', [
      Validators.required
    ]),
    'title': new FormControl('', [
      Validators.required
    ]),
    'description': new FormControl('', [
      Validators.required
    ]),
    'root': new FormControl('', [])
  });

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.locs$ = this.service.locations;
    this.service.loadAll();
  }

  addLocation() {
    this.service.addLocation(this.locationForm.value).subscribe(
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
