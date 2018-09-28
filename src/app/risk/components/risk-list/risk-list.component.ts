import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RiskService } from '../../../services/risk.service';
import { Observable } from 'rxjs';
import { Risk } from '../../../models/risk';
import { MatTableDataSource, MatDialog, MatPaginator, MatSort } from '@angular/material';
import { RiskAddComponent } from '../risk-add/risk-add.component';
import { RiskEditComponent } from '../risk-edit/risk-edit.component';
import { ConfirmDeletionComponent } from '../../../shared/confirm-deletion/confirm-deletion.component';
import { RiskDetailsComponent } from '../risk-details/risk-details.component';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-risk-list',
  templateUrl: './risk-list.component.html',
  styleUrls: ['./risk-list.component.scss']
})
export class RiskListComponent implements OnInit, AfterViewInit {

  constructor(
    private service: RiskService,
    private dialog: MatDialog,
    private loginService: LoginService
  ) { }

  loggedIn: Observable<boolean>;
  risks: Observable<Risk[]>;
  displayedColumns = ['title', 'reference', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.loggedIn = this.loginService.loggedIn;

    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();

    this.risks = this.service.risks;
    this.risks.subscribe(
      data => this.dataSource.data = data
    );
    this.service.loadAll();
  }

  applyFilter(value: string) {
    let filterValue = value.trim();
    filterValue = filterValue.toLowerCase(),
    this.dataSource.filter = value;
  }

  edit(risk: Risk) {
    const dialogRef = this.dialog.open(RiskEditComponent, {
      width: '50%',
      data: risk
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.service.loadAll();
        }
      }
    );
  }

  delete(risk: Risk) {
    const dialogRef = this.dialog.open(ConfirmDeletionComponent, {
      width: '500px',
      data: {
        item: risk.reference
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.service.deleteRisk(risk.ID).subscribe(
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

  details(risk: Risk) {
    this.dialog.open(RiskDetailsComponent, {
      width: '80%',
      data: risk
    });
  }

  displayAddDialog() {
    const dialogRef = this.dialog.open(RiskAddComponent, {
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.service.loadAll();
        }
      }
    );
  }

}
