import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DocumentService } from '../../../services/document.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Document } from '../../../models/document';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort } from '@angular/material';
import { DocumentAddComponent } from '../document-add/document-add.component';
import { DocumentEditComponent } from '../document-edit/document-edit.component';
import { ConfirmDeletionComponent } from '../../../shared/confirm-deletion/confirm-deletion.component';
import { DocumentDetailComponent } from '../document-detail/document-detail.component';
import { LoginService } from '../../../services/login.service';
import { ChoiceService } from '../../../services/choice.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  @ViewChild(MatSort)
  sort: MatSort;

  dataSource = new MatTableDataSource();
  displayedColumns = ['title', 'code', 'category', 'actions'];

  documents: Observable<Document[]>;
  message$: Observable<string>;

  loggedIn: Observable<boolean>;

  constructor(
    private service: DocumentService,
    private choiceService: ChoiceService,
    private dialog: MatDialog,
    private loginService: LoginService,
  ) { }

  ngOnInit() {

    this.loggedIn = this.loginService.loggedIn;
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();

    this.documents = this.service.documents.pipe(
      map(docs => docs.map(doc => ({ ...doc, category$: doc.category && this.choiceService.getChoice(doc.category.ID)})))
    );

    this.documents.subscribe(
      data => this.dataSource.data = data
    );
    this.service.loadAll();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(value) {
    let filterValue = value.trim();
    filterValue = filterValue.toLowerCase(),
    this.dataSource.filter = value;
  }

  displayAddDialog() {
    const dialogRef = this.dialog.open(DocumentAddComponent, {
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(
      document => {
        if (document) {
          this.service.loadAll();
        }
      }
    );
  }

  details(document) {
    const dialogRef = this.dialog.open(DocumentDetailComponent, {
      width: '80%',
      data: document
    });
  }

  edit(document: Document) {
    const dialogRef = this.dialog.open(DocumentEditComponent, {
      width: '80%',
      data: document
    });

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.service.loadAll();
        }
      }
    );
  }

  delete(document: Document) {
    const dialogRef = this.dialog.open(ConfirmDeletionComponent, {
      width: '450px',
      data: {
        item: document.title
      }
    });

    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.service.deleteDocument(document.ID).subscribe(
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
