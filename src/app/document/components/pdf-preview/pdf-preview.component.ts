import { Component, OnInit, Inject } from '@angular/core';
import { DocumentService } from '../../../services/document.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Document } from '../../../models/document';
import { Subject } from 'rxjs';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.scss']
})
export class PdfPreviewComponent implements OnInit {

  pdfUrl = new Subject<SafeResourceUrl>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public document: Document,
    private dialogRef: MatDialogRef<PdfPreviewComponent>,
    private sanitizer: DomSanitizer,
    private service: DocumentService
  ) { }

  ngOnInit() {
      this.service.downloadDocument(this.document.ID).subscribe(
        data => {
          const blob = new Blob([data], {type: 'application/pdf'});
          const reader = new FileReader();
          reader.addEventListener('load', () => this.pdfUrl.next(this.sanitizer.bypassSecurityTrustResourceUrl(<string>reader.result)));
          reader.readAsDataURL(blob);
        }
      );
  }

  close() {
    this.dialogRef.close(null);
  }

}
