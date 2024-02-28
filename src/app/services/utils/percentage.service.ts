import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PercentageService {

  constructor() { }

  static formatPercentage(percentage: number): string {
    return percentage.toFixed(2) + " %";
  }
}
