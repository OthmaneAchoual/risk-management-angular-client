import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { EquipmentService } from '../../../services/equipment.service';
import { Observable } from 'rxjs';
import { Equipment } from '../../../models/equipment';
import { MatTableDataSource, MatPaginator, MatDialog, MatSort } from '@angular/material';
import { EquipmentEditComponent } from '../equipment-edit/equipment-edit.component';
import { ConfirmDeletionComponent } from '../../../shared/confirm-deletion/confirm-deletion.component';
import { EquipmentAddComponent } from '../equipment-add/equipment-add.component';
import { EquipmentDetailComponent } from '../equipment-detail/equipment-detail.component';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  displayedColumns = ['title', 'code', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(
    private service: EquipmentService,
    private dialog: MatDialog,
    private loginService: LoginService
  ) { }

  equipment: Observable<Equipment[]>;
  loggedIn: Observable<boolean>;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.loggedIn = this.loginService.loggedIn;

    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();

    this.equipment = this.service.equipment;
    this.equipment.subscribe(
      data => this.dataSource.data = data
    );
    this.service.loadAll();
  }

  applyFilter(value) {
    let filterValue = value.trim();
    filterValue = filterValue.toLowerCase(),
    this.dataSource.filter = value;
  }

  displayAddDialog() {
    const dialogRef = this.dialog.open(EquipmentAddComponent, {
        width: '80%'
      }
    );

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.service.loadAll();
        }
      }
    );
  }

  details(piece: Equipment) {
    const dialogRef = this.dialog.open(EquipmentDetailComponent, {
      width: '80%',
      data: piece
    });
  }

  edit(piece: Equipment) {
    const dialogRef = this.dialog.open(EquipmentEditComponent, {
      width: '80%',
      data: piece
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.service.loadAll();
        }
      }
    );
  }

  delete(piece: Equipment) {
    const dialogRef = this.dialog.open(ConfirmDeletionComponent, {
      width: '450px',
      data: {
        item: piece.title
      }
    });

    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.service.deleteEquipment(piece.ID).subscribe(
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
