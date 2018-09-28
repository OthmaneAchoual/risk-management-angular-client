import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LocationService } from '../../../services/location.service';
import { Observable } from 'rxjs';

import { Location } from '../../../models/location';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { ConfirmDeletionComponent } from '../../../shared/confirm-deletion/confirm-deletion.component';
import { LocationAddComponent } from '../location-add/location-add.component';
import { LocationEditComponent } from '../location-edit/location-edit.component';
import { LocationDetailComponent } from '../location-detail/location-detail.component';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  dataSource = new MatTableDataSource([]);
  displayedColumns = ['title', 'code', 'actions'];

  locations: Observable<Location[]>;
  loggedIn: Observable<boolean>;

  constructor(
    private service: LocationService,
    private dialog: MatDialog,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();
    this.dataSource.filterPredicate = (loc: Location, filter: string) => {
      return loc.title.toLowerCase().includes(filter) ||
             loc.code.toLowerCase().includes(filter) ||
             loc.description.toLowerCase().includes(filter);
    };
    this.loggedIn = this.loginService.loggedIn;

    this.locations = this.service.locations;
    this.locations.subscribe(
      data => this.dataSource.data = data
    );
    this.service.loadAll();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(),
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  displayAddDialog() {
    const dialogRef = this.dialog.open(LocationAddComponent, {
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.service.loadAll();
        }
      }
    );
  }

  details(location: Location) {
    this.dialog.open(LocationDetailComponent, {
      width: '80%',
      data: location
    });
  }

  edit(location: Location) {
    const dialogRef = this.dialog.open(LocationEditComponent, {
      width: '80%',
      data: location
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.service.loadAll();
        }
      }
    );
  }

  delete(location) {
    const dialogRef = this.dialog.open(ConfirmDeletionComponent, {
      width: '500px',
      data: {
        item: location.title
      }
    });

    dialogRef.afterClosed().subscribe(
      shouldDelete => {
        if (shouldDelete) {
          this.service.deleteLocation(location.ID).subscribe(
            _ => this.service.loadAll(),
            err => {
              if (err.status === 401) {
                this.loginService.updateSession();
              }
            }
          );
        }
      }
    );
  }

}
