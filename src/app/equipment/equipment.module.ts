import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentListComponent } from './components/equipment-list/equipment-list.component';
import { EquipmentService } from '../services/equipment.service';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChoiceService } from '../services/choice.service';

const routes: Routes = [
  { path: '', component: EquipmentListComponent }
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
    EquipmentListComponent
  ],
  providers: [
    EquipmentService,
    ChoiceService
  ]
})
export class EquipmentModule { }
