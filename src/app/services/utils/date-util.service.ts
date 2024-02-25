import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class DateUtilService {

  constructor() { }

  public formatStartDateAppointment(dateString: string) {
    // Création d'un objet Date à partir de la date string
    // let dateObject = new Date(dateString);
    if (dateString === undefined || dateString==null || dateString=="" ) return "";
    const date = DateTime.fromISO(dateString);
    return date.setLocale('fr').toLocaleString(DateTime.DATETIME_FULL);
  }


}
