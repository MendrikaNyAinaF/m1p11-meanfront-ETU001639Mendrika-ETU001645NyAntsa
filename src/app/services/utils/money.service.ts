import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoneyService {

  constructor() { }

    static formatMoney(money: number): string {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MGA' }).format(money);
    }
}
