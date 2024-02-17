import { Injectable } from '@angular/core';
import { CrudService } from '../crud/crud.service';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class TypeExpenseService extends CrudService {
  constructor(api: BaseApiService) {
    super(api, { name: 'type_depense' });
  }

  override create(body: any) {
    const formatBody={
      code: body.code,
      nom: body.nom,
      status:1
    }
    return super.create(formatBody);
  }

  override update(id: string, body: any) {
    const formatBody={
      code: body.code,
      nom: body.nom,
      status:1
    }
    return super.update(id, formatBody);
  }
}
