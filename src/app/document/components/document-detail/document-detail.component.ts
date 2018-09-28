import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../../../models/document';
import { DocumentService } from '../../../services/document.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import * as FileSaver from 'file-saver';
import { PdfPreviewComponent } from '../pdf-preview/pdf-preview.component';
import { ChoiceService } from '../../../services/choice.service';
import { Choice } from '../../../models/choice';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.scss']
})
export class DocumentDetailComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public document: Document,
    private service: DocumentService,
    private choiceService: ChoiceService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DocumentDetailComponent>
  ) { }

  category$: Observable<Choice>;

  ngOnInit() {
    this.category$ = this.document.category && this.choiceService.getChoice(this.document.category.__KEY);
  }

  close() {
    this.dialogRef.close(null);
  }

  download(document) {
    this.service.downloadDocument(document.ID).subscribe(
      data => {
        console.log(data);
        const blob = new Blob([data]);
        FileSaver.saveAs(blob, document.file.split('_')[1]);
      }
    );
  }

  preview(document) {
    this.dialog.open(PdfPreviewComponent, {
      width: '80%',
      height: '80%',
      data: document
    });
  }

}
