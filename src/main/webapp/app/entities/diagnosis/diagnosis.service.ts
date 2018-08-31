import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDiagnosis } from 'app/shared/model/diagnosis.model';

type EntityResponseType = HttpResponse<IDiagnosis>;
type EntityArrayResponseType = HttpResponse<IDiagnosis[]>;

@Injectable({ providedIn: 'root' })
export class DiagnosisService {
    private resourceUrl = SERVER_API_URL + 'api/diagnoses';

    constructor(private http: HttpClient) {}

    create(diagnosis: IDiagnosis): Observable<EntityResponseType> {
        return this.http.post<IDiagnosis>(this.resourceUrl, diagnosis, { observe: 'response' });
    }

    update(diagnosis: IDiagnosis): Observable<EntityResponseType> {
        return this.http.put<IDiagnosis>(this.resourceUrl, diagnosis, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDiagnosis>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDiagnosis[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
