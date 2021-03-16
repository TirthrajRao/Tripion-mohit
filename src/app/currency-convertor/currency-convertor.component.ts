import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CurrencyConvertorService } from '../services/currency-convertor.service';

@Component({
  selector: 'app-currency-convertor',
  templateUrl: './currency-convertor.component.html',
  styleUrls: ['./currency-convertor.component.scss'],
})
export class CurrencyConvertorComponent implements OnInit {

  countryCodes = [];
  countryNames = new Map();

  resultRate: any;
  swappedRate: any;

  fromValue: any;
  toValue: any;

  fromCurr: any = 'INR';
  toCurr: any = 'USD'; //LKR

  constructor(public navCtrl: NavController, protected ccService: CurrencyConvertorService) {
  }
  
  ngOnInit() {
    this.fetchCountries();
    this.getCurrencyRate();
    this.fromValue = 10000;
  }

  /* An asynchronous function which retrieves CountryCode List */
  async fetchCountries() {
    try {
      const res = await this.ccService.getCountries();
      for (let x in res['results']) {
        this.countryCodes.push(x);
        this.countryNames.set(x, res['results'][x].id);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async getCurrencyRate() {
    let from = this.fromCurr;
    let to = this.toCurr;
    try {
      const exchangeRate = await this.ccService.getExchangeRate(from, to);
      let rate = exchangeRate[from + "_" + to].val;
      this.resultRate = rate;
      this.calculateCurrencyOne();
    }
    catch (err) {
      console.error(err);
    }
  }

  calculateCurrencyOne() {
    this.toValue = this.fromValue * parseFloat(this.resultRate);
  }

  // calculateCurrencyTwo() {
  //   this.fromValue = this.toValue / parseFloat(this.resultRate);
  // }

}
