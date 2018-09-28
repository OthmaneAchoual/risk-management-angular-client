import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatDialog, MatAutocompleteSelectedEvent } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { startWith, switchMap, map } from 'rxjs/operators';
import { WorkContext } from '../../../models/work-context';
import { WorkContextService } from '../../../services/work-context.service';
import { AddWorkcontextDialogComponent } from '../add-workcontext-dialog/add-workcontext-dialog.component';
import { ConfirmDeletionComponent } from '../../../shared/confirm-deletion/confirm-deletion.component';
import { EditWorkContextComponent } from '../edit-work-context/edit-work-context.component';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-work-contexts-list',
  templateUrl: './work-contexts-list.component.html',
  styleUrls: ['./work-contexts-list.component.scss']
})
export class WorkContextsListComponent implements OnInit {

  @Input()
  route: ActivatedRoute;

  @ViewChild('wcInput')
  wcInput: ElementRef;

  contexts: Observable<WorkContext[]>;
  current$: Observable<WorkContext>;
  loggedIn: Observable<boolean>;

  constructor(
    private service: WorkContextService,
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  myControl = new FormControl();

  filteredOptions: Observable<WorkContext[]>;

  ngOnInit() {
    this.loggedIn = this.loginService.loggedIn;

    this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith<string | WorkContext>(''),
        map(val => typeof val === 'string' ? val : val.name),
        switchMap(val => this.service.filter(val))
      );

      this.contexts = this.service.contexts;
      this.service.loadAll();

      this.current$ = this.service.lastContext;
  }

  filter(val: string, contexts: WorkContext[]): string[] {
    return contexts
    .filter(ctx => ctx.name.toLowerCase().indexOf(val.toLowerCase()) === 0)
    .map(ctx => ctx.name);
  }

  openAddWorkContextDialog() {
    const dialogRef = this.dialog.open(AddWorkcontextDialogComponent, {
      width: '80%',
      height: '80%'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          console.log(result);
          this.service.addWorkContext(result).subscribe(
            context => {
              this.service.loadAll();
              this.router.navigate(['/workcontexts', context.ID]);
            },
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

  navigate(id) {
    this.router.navigate(['/workcontexts', id]);
  }

  displayFn(wc?: WorkContext): string | undefined {
    return wc ? wc.name : undefined;
  }

  onSelect(e: MatAutocompleteSelectedEvent) {
    this.myControl.setValue('');
    this.wcInput.nativeElement.blur();
    this.router.navigate(['/workcontexts', e.option.value.ID]);
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
          if (window.location.pathname.search(/workcontexts\/[a-fA-F0-9]{32}/) !== -1) {
            window.location.reload();
          } else {
            this.service.loadAll();
          }
        }
      }
    );
  }

  delete(context: WorkContext) {
    const dialogRef = this.dialog.open(ConfirmDeletionComponent, {
      width: '450px',
      data: {
        item: context.name
      }
    });

    dialogRef.afterClosed().subscribe(
      confirm => {
        if (confirm) {
          this.service.deleteContext(context.ID).subscribe(
            res => this.router.navigate(['/workcontexts'])
          );
        }
      }
    );
  }
}
