import { Injectable } from '@angular/core';
import { PersonneService } from './personne.service';
import { BaseApiService } from '../base-api.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService extends PersonneService {

  constructor(public override baseApi: BaseApiService,
    public override storage: StorageService) { 
      super(baseApi, storage,{role:"client"});
    }
}