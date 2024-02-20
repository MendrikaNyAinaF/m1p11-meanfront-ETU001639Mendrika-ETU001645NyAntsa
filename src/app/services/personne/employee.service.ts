import { Injectable } from '@angular/core';
import { PersonneService } from './personne.service';
import { BaseApiService } from '../base-api.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends PersonneService{

  constructor(public override baseApi: BaseApiService,
    public override storage: StorageService) { 
      super(baseApi, storage,{role:"employee"});
    }

  findAll(params?:any){
    return this.baseApi.get(`${this.baseUrl}/employee`, params);
  }
  getDefaultLogin(){
    return {
      email: "rajaonarivonynyantsa@gmail.com",
      password: "passwordNotCryptedYet123!"
    }
  }
  findAllByPreference(){
    const client=this.storage.getCurrentUserInfo(); 
    //TODO 
    return this.baseApi.get(`${this.baseUrl}/employee`);

  }
}
