import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkContextDetailsComponent } from './components/work-context-details/work-context-details.component';
import { AddWorkContextComponent } from './components/add-work-context/add-work-context.component';
import { WorkContextTableComponent } from './components/work-context-table/work-context-table.component';

const routes: Routes = [
    { path: '', component: WorkContextTableComponent },
    { path: 'add', component: AddWorkContextComponent },
    { path: ':id', component: WorkContextDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkContextRoutingModule {
}
