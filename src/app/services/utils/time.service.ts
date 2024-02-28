import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TimeService {

    constructor() {
    }

    static formatDurationMinutes(duration: any): string {
        return duration.toFixed(2) + " " + "min";
    }
}
