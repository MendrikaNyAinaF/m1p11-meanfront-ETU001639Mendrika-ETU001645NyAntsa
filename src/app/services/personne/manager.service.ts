import { Injectable } from '@angular/core';
import { PersonneService } from './personne.service';
import { BaseApiService } from '../base-api.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService extends PersonneService {

  constructor(public override baseApi: BaseApiService,
    public override storage: StorageService) { 
      super(baseApi, storage,{role:"manager"});
    }

    getDefaultLogin(){
      return {
        email: "ranjalahynyantsa+test@gmail.com",
        password: "passwordNotCryptedYet123!"
      }
    }
    update( data:any){
      const client= this.storage.getCurrentUserInfo();
      return this.baseApi.put(`${this.baseApi.baseUrl}/admin/${client.id}`,data);
    }
}
