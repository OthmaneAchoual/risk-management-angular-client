import { NgModule } from '@angular/core';
import { WorkContextRoutingModule } from './work-context.routing';
import { WorkContextDetailsComponent } from './components/work-context-details/work-context-details.component';
import { MaterialModule } from '../shared/material.module';
import { CommonModule } from '@angular/common';
import { AddWorkContextComponent } from './components/add-work-context/add-work-context.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkContextTableComponent } from './components/work-context-table/work-context-table.component';
import { WorkContextDetailsDialogComponent } from './components/work-context-details-dialog/work-context-details-dialog.component';


@NgModule({
    declarations: [
        WorkContextDetailsComponent,
        AddWorkContextComponent,
        WorkContextTableComponent,
        WorkContextDetailsDialogComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        RouterModule,
        WorkContextRoutingModule
    ],
    entryComponents: [
        WorkContextDetailsDialogComponent
    ]
})
export class WorkContextModule {
}
