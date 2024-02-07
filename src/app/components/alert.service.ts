import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  /* alert success*/
  alertError(message: string,  options?: SweetAlertOptions) {
    return Swal.fire({
      title: "Error",
      text: message,
      icon: 'error',
      ...options
    });
  }

  /* alert success*/
  alertSuccess(message: string, options?: SweetAlertOptions) {
    return Swal.fire({
      title: "Success",
      text: message,
      icon: 'success',
      ...options
    });
  }
}
