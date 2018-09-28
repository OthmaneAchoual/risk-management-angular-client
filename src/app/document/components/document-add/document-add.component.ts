import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DocumentService } from '../../../services/document.service';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { switchMap, map } from 'rxjs/operators';
import { ChoiceService } from '../../../services/choice.service';
import { Observable } from 'rxjs';
import { Choice } from '../../../models/choice';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-document-add',
  templateUrl: './document-add.component.html',
  styleUrls: ['./document-add.component.scss']
})
export class DocumentAddComponent implements OnInit, AfterViewInit {

  constructor(
    private service: DocumentService,
    private choiceService: ChoiceService,
    private login: LoginService,
    private dialogRef: MatDialogRef<DocumentAddComponent>
  ) { }

  choices$: Observable<Choice[]>;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  file: any;
  loaded = false;

  documentForm = new FormGroup({
    'title': new FormControl('', [
      Validators.required
    ]),
    'code': new FormControl('', [
      Validators.required
    ]),
    'category': new FormControl('', [
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

  add() {
    if (this.loaded) {
      const input = new FormData();
      const fileToUpload = this.file.files[0];
      input.append(fileToUpload.name, fileToUpload);
      console.log(input);
      this.service.uploadDocument(input).pipe(
        switchMap(file => this.service.addDocument({ ...this.documentForm.value, file }))
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
  }

  cancel() {
    this.dialogRef.close(null);
  }


  addFile() {
    if (this.file.files && this.file.files[0]) {
      this.loaded = true;
    }
  }

}
