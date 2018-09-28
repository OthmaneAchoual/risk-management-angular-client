import { NgModule, ModuleWithProviders } from '@angular/core';
import { ChoiceService } from '../services/choice.service';
import { DocumentService } from '../services/document.service';
import { EquipmentService } from '../services/equipment.service';
import { LocationService } from '../services/location.service';
import { RiskService } from '../services/risk.service';
import { StaffService } from '../services/staff.service';
import { WorkContextService } from '../services/work-context.service';
import { LoginService } from '../services/login.service';
import { SessionInterceptor } from '../services/session-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({})
export class ProviderModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ProviderModule,
            providers: [
                ChoiceService,
                DocumentService,
                EquipmentService,
                LocationService,
                RiskService,
                StaffService,
                WorkContextService,
                LoginService,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: SessionInterceptor,
                    multi: true
                }
            ]
        };
    }
}
