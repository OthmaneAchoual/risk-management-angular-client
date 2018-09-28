import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StaffListComponent } from './components/staff-list/staff-list.component';
import { StaffNavItemComponent } from './components/staff-nav-item/staff-nav-item.component';
import { MaterialModule } from '../shared/material.module';
import { StaffService } from '../services/staff.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkContextService } from '../services/work-context.service';

const routes: Routes = [
  { path: '', component: StaffListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    StaffListComponent,
    StaffNavItemComponent
  ],
  providers: [
    StaffService,
    WorkContextService
  ]
})
export class StaffModule { }
