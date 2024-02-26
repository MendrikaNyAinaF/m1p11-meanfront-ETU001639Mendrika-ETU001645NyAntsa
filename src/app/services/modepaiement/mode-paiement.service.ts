import { Injectable } from '@angular/core';
import { CrudService } from '../crud/crud.service';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ModePaiementService extends CrudService {

  constructor(api: BaseApiService) {
    super(api, { name: 'mode_paiement' });
  }
}
