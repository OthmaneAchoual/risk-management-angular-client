import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RiskListComponent } from './components/risk-list/risk-list.component';
import { RiskService } from '../services/risk.service';
import { RiskNavItemComponent } from './components/risk-nav-item/risk-nav-item.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: RiskListComponent }
];

@NgModule({
  declarations: [
    RiskListComponent,
    RiskNavItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    RiskService
  ]
})
export class RiskModule { }
