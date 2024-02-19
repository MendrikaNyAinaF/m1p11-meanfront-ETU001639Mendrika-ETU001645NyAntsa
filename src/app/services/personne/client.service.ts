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

  update(id:string, data:any){
    return this.baseApi.put(`client-crud/${id}`,data);
  }

  getDefaultLogin(){
    return {
      email: "erica@gmail.com",
      password: "passwordNotCryptedYet123!"
    }
  }
}
