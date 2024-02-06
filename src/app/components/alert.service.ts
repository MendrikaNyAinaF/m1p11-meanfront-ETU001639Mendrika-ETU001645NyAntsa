import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  alertError(message: string,  options?: SweetAlertOptions) {
    return Swal.fire({
      title: "Error",
      text: message,
      icon: 'error',
      ...options
    });
  }

  alertSuccess(message: string, options?: SweetAlertOptions) {
    return Swal.fire({
      title: "Success",
      text: message,
      icon: 'success',
      ...options
    });
  }
}
