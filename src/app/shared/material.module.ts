import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatTooltipModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatStepperModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ConfirmDeletionComponent } from './confirm-deletion/confirm-deletion.component';
import { AddWorkcontextDialogComponent } from '../workcontext/components/add-workcontext-dialog/add-workcontext-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SafeHtmlPipe } from './pipes.safehtml';
import { RiskAddComponent } from '../risk/components/risk-add/risk-add.component';
import { RiskEditComponent } from '../risk/components/risk-edit/risk-edit.component';
import { EditStaffComponent } from '../staff/components/edit-staff/edit-staff.component';
import { StaffAddComponent } from '../staff/components/staff-add/staff-add.component';
import { DocumentAddComponent } from '../document/components/document-add/document-add.component';
import { EquipmentAddComponent } from '../equipment/components/equipment-add/equipment-add.component';
import { EquipmentEditComponent } from '../equipment/components/equipment-edit/equipment-edit.component';
import { DocumentEditComponent } from '../document/components/document-edit/document-edit.component';
import { LocationAddComponent } from '../location/components/location-add/location-add.component';
import { LocationEditComponent } from '../location/components/location-edit/location-edit.component';
import { RiskDetailsComponent } from '../risk/components/risk-details/risk-details.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DocumentDetailComponent } from '../document/components/document-detail/document-detail.component';
import { StaffDetailComponent } from '../staff/components/staff-detail/staff-detail.component';
import { EquipmentDetailComponent } from '../equipment/components/equipment-detail/equipment-detail.component';
import { LocationDetailComponent } from '../location/components/location-detail/location-detail.component';
import { EditWorkContextComponent } from '../workcontext/components/edit-work-context/edit-work-context.component';
import { ChoiceAddComponent } from '../choice/components/choice-add/choice-add.component';
import { ChoiceEditComponent } from '../choice/components/choice-edit/choice-edit.component';
import { LoginComponent } from '../components/login/login.component';
import { PdfPreviewComponent } from '../document/components/pdf-preview/pdf-preview.component';
import { PellModule } from 'angular-pell';
import { ChoiceDetailComponent } from '../choice/components/choice-detail/choice-detail.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    PerfectScrollbarModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PellModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    CdkTableModule
  ],
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    CdkTableModule,
    SafeHtmlPipe
  ],
  declarations: [
    PdfPreviewComponent,
    ConfirmDeletionComponent,
    AddWorkcontextDialogComponent,
    EditWorkContextComponent,
    RiskAddComponent,
    RiskEditComponent,
    RiskDetailsComponent,
    EditStaffComponent,
    StaffAddComponent,
    StaffDetailComponent,
    DocumentAddComponent,
    DocumentEditComponent,
    DocumentDetailComponent,
    EquipmentAddComponent,
    EquipmentEditComponent,
    EquipmentDetailComponent,
    LocationAddComponent,
    LocationEditComponent,
    LocationDetailComponent,
    ChoiceAddComponent,
    ChoiceEditComponent,
    ChoiceDetailComponent,
    LoginComponent,
    SafeHtmlPipe
  ],
  providers: [
    // StaffService,
    // RiskService,
    // ChoiceService,
    // EquipmentService,
    // WorkContextService,
    // DocumentService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  entryComponents: [
    PdfPreviewComponent,
    ConfirmDeletionComponent,
    AddWorkcontextDialogComponent,
    EditWorkContextComponent,
    RiskAddComponent,
    RiskEditComponent,
    RiskDetailsComponent,
    EditStaffComponent,
    StaffAddComponent,
    StaffDetailComponent,
    DocumentAddComponent,
    DocumentEditComponent,
    DocumentDetailComponent,
    EquipmentAddComponent,
    EquipmentEditComponent,
    EquipmentDetailComponent,
    LocationAddComponent,
    LocationEditComponent,
    LocationDetailComponent,
    ChoiceAddComponent,
    ChoiceEditComponent,
    ChoiceDetailComponent,
    LoginComponent
  ]
})
export class MaterialModule { }
