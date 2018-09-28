import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { WorkContext } from '../../../models/work-context';
import { WorkContextService } from '../../../services/work-context.service';
import { Router } from '@angular/router';
import { EditWorkContextComponent } from '../edit-work-context/edit-work-context.component';
import { LoginService } from '../../../services/login.service';
import { ConfirmDeletionComponent } from '../../../shared/confirm-deletion/confirm-deletion.component';

@Component({
  selector: 'app-work-context-table',
  templateUrl: './work-context-table.component.html',
  styleUrls: ['./work-context-table.component.scss']
})
export class WorkContextTableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  dataSource = new MatTableDataSource();
  displayedColumns = ['code', 'name', 'actions'];

  wcs: Observable<WorkContext[]>;
  loggedIn: Observable<boolean>;

  constructor(
    private service: WorkContextService,
    private dialog: MatDialog,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loggedIn = this.loginService.loggedIn;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();

    this.wcs = this.service.contexts;
    this.wcs.subscribe(
      data => this.dataSource.data = data
    );
    this.service.loadAll();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  details(wc: WorkContext) {
    this.router.navigate(['/workcontexts', wc.ID]);
  }

  edit(wc: WorkContext) {
    const dialogRef = this.dialog.open(EditWorkContextComponent, {
      width: '80%',
      height: '80%',
      data: wc
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.service.loadAll();
        }
      }
    );
  }

  delete(wc: WorkContext) {
    const dialogRef = this.dialog.open(ConfirmDeletionComponent, {
      width: '450px',
      data: {
        item: wc.name
      }
    });

    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.service.deleteContext(wc.ID).subscribe(
            _ => this.router.navigate(['/workcontexts']),
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

  applyFilter(value) {
    let filterValue = value.trim();
    filterValue = filterValue.toLowerCase(),
    this.dataSource.filter = value;
  }

}
