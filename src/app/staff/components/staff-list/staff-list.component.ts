import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { StaffService } from '../../../services/staff.service';
import { Observable, Subject } from 'rxjs';
import { User } from '../../../models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource, MatPaginator, MatDialog, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmDeletionComponent } from '../../../shared/confirm-deletion/confirm-deletion.component';
import { EditStaffComponent } from '../edit-staff/edit-staff.component';
import { StaffAddComponent } from '../staff-add/staff-add.component';
import { StaffDetailComponent } from '../staff-detail/staff-detail.component';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit, AfterViewInit {

  staff: Observable<User[]>;
  dataSource = new MatTableDataSource();
  displayedColumns = ['firstname', 'lastname', 'email', 'actions'];
  error = new Subject<HttpErrorResponse>();
  loggedIn: Observable<boolean>;


  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private service: StaffService,
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loggedIn = this.loginService.loggedIn;

    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();

    this.staff = this.service.staff;
    this.service.loadAll(this.error);

    this.staff.subscribe(
      data => {
        this.dataSource.data = data;
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(value: string) {
    let filterValue = value.trim();
    filterValue = filterValue.toLowerCase(),
    this.dataSource.filter = value;
  }

  edit(user: User) {
    const dialogRef = this.dialog.open(EditStaffComponent, {
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
            this.service.loadAll(this.error);
        }
      }
    );
  }

  display(person: User) {
    const dialogRef = this.dialog.open(StaffDetailComponent, {
      width: '80%',
      data: person
    });
  }

  delete(user: User) {
    const dialogRef = this.dialog.open(ConfirmDeletionComponent, {
      width: '500px',
      data: {
        item: `${user.lastname}, ${user.firstname}`
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.service.deleteUser(user.ID).subscribe(
            _ => this.service.loadAll(this.error),
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

  add() {
    const dialogRef = this.dialog.open(StaffAddComponent, {
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.service.loadAll(this.error);
        }
      }
    );
  }

}
