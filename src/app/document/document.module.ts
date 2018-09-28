import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { MaterialModule } from '../shared/material.module';
import { DocumentService } from '../services/document.service';

const routes: Routes = [
  { path: '', component: DocumentListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DocumentListComponent
  ],
  providers: [
    DocumentService
  ]
})
export class DocumentModule { }
