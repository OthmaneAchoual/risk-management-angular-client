import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';

 // DO NOT IMPORT THE LAZY LOADED MODULE !!!!!!!!

const routes: Routes = [
    { path: '', redirectTo: 'workcontexts', pathMatch: 'full' },
    // { path: 'admin' },
    {
        path: '', component: AdminComponent, children: [
            { path: 'workcontexts', loadChildren: './workcontext/work-context.module#WorkContextModule' },
            { path: 'risks', loadChildren: './risk/risk.module#RiskModule'},
            { path: 'staff', loadChildren: './staff/staff.module#StaffModule'},
            { path: 'equipment', loadChildren: './equipment/equipment.module#EquipmentModule'},
            { path: 'documents', loadChildren: './document/document.module#DocumentModule'},
            { path: 'locations', loadChildren: './location/location.module#LocationModule'},
            { path: 'choices',  loadChildren: './choice/choice.module#ChoiceModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
