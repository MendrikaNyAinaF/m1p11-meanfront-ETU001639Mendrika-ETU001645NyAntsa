import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private baseApi: BaseApiService, private storageService: StorageService) { }

  public findAll(page?: number) {
    const client = this.storageService.getCurrentUserInfo();
    const search = {
      "client": client.id,
      "page": {
        "size": 10,
        "number": page || 0
      }
    };
    const base64 = btoa(JSON.stringify(search));
    return this.baseApi.get(`${this.baseApi.baseUrl}/notification?criteria=${base64}`, { body: search });
  }

}
