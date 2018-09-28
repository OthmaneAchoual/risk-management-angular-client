import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../../../models/document';
import { DocumentService } from '../../../services/document.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { saveAs } from 'file-saver/FileSaver';
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
    this.category$ = this.document.category && this.choiceService.getChoice(this.document.category.ID);
  }

  close() {
    this.dialogRef.close(null);
  }

  download(document: Document) {
    this.service.downloadDocument(document.ID).subscribe(
      data => {
        const blob = new Blob([data]);
        const parts = document.filePath.split('/');
        saveAs(blob, parts[parts.length - 1]);
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
