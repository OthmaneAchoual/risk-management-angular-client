import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { ChoiceListComponent } from './components/choice-list/choice-list.component';
import { ChoiceService } from '../services/choice.service';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: ChoiceListComponent },
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
    ChoiceListComponent,
  ],
  providers: [
    ChoiceService
  ]
})
export class ChoiceModule { }
