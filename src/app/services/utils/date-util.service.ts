import {Injectable} from '@angular/core';
import {DateTime} from 'luxon';

@Injectable({
    providedIn: 'root'
})
export class DateUtilService {

    constructor() {
    }

    public formatStartDateAppointment(dateString: string) {
        // Création d'un objet Date à partir de la date string
        // let dateObject = new Date(dateString);
        if (dateString === undefined || dateString == null || dateString == "") return "";
        const date = DateTime.fromISO(dateString);
        return date.setLocale('fr').toLocaleString(DateTime.DATETIME_FULL);
    }

    public getLastDayOfMonth(date: string) {
        const dateObject = DateTime.fromISO(date);
        return dateObject.endOf('month').toISODate();
    }

    public getFirstAndLastDateInCurrentMonth() {
        const date = new Date();
        return [new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0], new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split('T')[0]];
    }

    static formatDate(date: string) {
        const dateObject = DateTime.fromISO(date);
        const dateWithGMT= dateObject.setLocale('fr').toLocaleString(DateTime.DATETIME_FULL);
    //     remove last 6 characters
        return dateWithGMT.slice(0, -6);
    }
}
