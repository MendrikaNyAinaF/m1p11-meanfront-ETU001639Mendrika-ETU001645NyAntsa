import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

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
    public formatterFullDate(dateString: string) {
        // Vérifier si la chaîne est au format YYYY-MM-DDTHH:mm
        if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(dateString)) {
            // Ajouter ':00' à la fin si ce n'est pas déjà le cas
           dateString+= ':00';
        }
        return dateString;
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
        if (date === undefined || date == null || date == "") return "";
        const dateObject = DateTime.fromISO(date);
        const dateWithGMT = dateObject.setLocale('fr').toLocaleString(DateTime.DATETIME_FULL);
        //     remove last 6 characters
        return dateWithGMT.slice(0, -6);
    }
}
