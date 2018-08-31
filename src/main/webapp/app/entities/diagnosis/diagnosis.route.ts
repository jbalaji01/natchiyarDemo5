import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Diagnosis } from 'app/shared/model/diagnosis.model';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisComponent } from './diagnosis.component';
import { DiagnosisDetailComponent } from './diagnosis-detail.component';
import { DiagnosisUpdateComponent } from './diagnosis-update.component';
import { DiagnosisDeletePopupComponent } from './diagnosis-delete-dialog.component';
import { IDiagnosis } from 'app/shared/model/diagnosis.model';

@Injectable({ providedIn: 'root' })
export class DiagnosisResolve implements Resolve<IDiagnosis> {
    constructor(private service: DiagnosisService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((diagnosis: HttpResponse<Diagnosis>) => diagnosis.body));
        }
        return of(new Diagnosis());
    }
}

export const diagnosisRoute: Routes = [
    {
        path: 'diagnosis',
        component: DiagnosisComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Diagnoses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'diagnosis/:id/view',
        component: DiagnosisDetailComponent,
        resolve: {
            diagnosis: DiagnosisResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Diagnoses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'diagnosis/new',
        component: DiagnosisUpdateComponent,
        resolve: {
            diagnosis: DiagnosisResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Diagnoses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'diagnosis/:id/edit',
        component: DiagnosisUpdateComponent,
        resolve: {
            diagnosis: DiagnosisResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Diagnoses'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const diagnosisPopupRoute: Routes = [
    {
        path: 'diagnosis/:id/delete',
        component: DiagnosisDeletePopupComponent,
        resolve: {
            diagnosis: DiagnosisResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Diagnoses'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
