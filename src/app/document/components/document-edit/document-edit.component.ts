import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Document } from '../../../models/document';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DocumentService } from '../../../services/document.service';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Choice } from '../../../models/choice';
import { ChoiceService } from '../../../services/choice.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent implements OnInit, AfterViewInit {

  @ViewChild('fileInput')
  fileInput: ElementRef;

  file: any;
  loaded = false;

  choices$: Observable<Choice[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public document: Document,
    private service: DocumentService,
    private choiceService: ChoiceService,
    private login: LoginService,
    private dialogRef: MatDialogRef<DocumentEditComponent>
  ) { }

  docForm = new FormGroup({
    'ID': new FormControl(this.document.ID, []),
    'title': new FormControl(this.document.title, [
      Validators.required
    ]),
    'code': new FormControl(this.document.code, [
      Validators.required
    ]),
    'category': new FormControl((this.document.category && this.document.category.__KEY) || '', [
      Validators.required
    ])
  });

  ngOnInit() {
    this.choices$ = this.choiceService.choices.pipe(
      map(choices => choices.filter(choice => choice.category === 'DOCUMENT_TYPE'))
    );
    this.choiceService.loadAll();
  }

  ngAfterViewInit() {
    this.file = this.fileInput.nativeElement;
  }

  cancel() {
    this.dialogRef.close(null);
  }

  edit() {
    if (this.loaded) {
      const input = new FormData();
      const fileToUpload = this.file.files[0];
      input.append(fileToUpload.name, fileToUpload);
      this.service.uploadDocument(input).pipe(
        switchMap(file => this.service.editDocument({ ...this.docForm.value, file }))
      ).subscribe(
        doc => this.dialogRef.close(doc),
        err => {
          if (err.status === 401) {
            this.login.updateSession();
          }
          this.dialogRef.close(null);
        }
      );
    }
    this.service.editDocument(this.docForm.value).subscribe(
      data => this.dialogRef.close(data)
    );
  }

  addFile() {
    if (this.file.files && this.file.files[0]) {
      this.loaded = true;
    }
  }

}
