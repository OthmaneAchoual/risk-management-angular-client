import { Component, OnInit, Inject } from '@angular/core';
import { LocationService } from '../../../services/location.service';
import { Location } from '../../../models/location';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.scss']
})
export class LocationDetailComponent implements OnInit {

  location$: Observable<Location>;
  root$: Observable<Location>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public location: Location,
    private service: LocationService
  ) { }

  ngOnInit() {
    // this.root$ = this.location.root_location && this.service.getLocation(this.location.root_location.__KEY);
  }

}
