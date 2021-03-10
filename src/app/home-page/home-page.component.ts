import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { TripService } from '../services/trip.service';
import { ToastService } from '../services/toast.service';
import { Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { FilePath } from '@ionic-native/file-path/ngx';
import { AppComponent } from '../app.component';
import * as _ from 'lodash';
import * as moment from 'moment';
import { NativeGeocoderOptions, NativeGeocoderResult, NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

declare const $: any;
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {

  latitude: any;
  longitude: any;
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  currentTime;
  refreshIntervalId;
  cityName: any;
  temperature;
  temperatureIcon: any;
  loading: Boolean = false;
  notificationCount: any;
  homeTownData: any;
  tempratureIndex = localStorage.getItem('temprature');
  tempratureCity: any;
  cityRefreshInterval: any;
  searchedResult: any = [];
  tempratureData: any;
  timeData: any;
  timeCity: any;
  constructor(
    private geolocation: Geolocation,
    public http: HttpClient,
    public router: Router,
    public _tripService: TripService,
    public _toastService: ToastService,
    public _userService: UserService,
    public event: Events,
    private filePath: FilePath,
    public appComponent: AppComponent,
    private nativeGeocoder: NativeGeocoder,
    ) {


    this._userService.notiFicationCounts().subscribe(response => {
      this.notificationCount = response.notification.count;
      console.log("response of notification count in home page =====>", response, this.notificationCount);

    })
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log("in enter");
    this.tempratureData = JSON.parse(localStorage.getItem('tempratureData'));
    this.timeData = JSON.parse(localStorage.getItem('timeData'))
    console.log("this.temprature data", this.tempratureData, this.timeData);

    //Get Temprature
    if (this.tempratureData) {
      this.tempratureCity = this.tempratureData.name;
      this.getWeather(this.tempratureData.lat, this.tempratureData.lng)
    }

    //Get Time
    if (this.timeData) {
      this.timeCity = this.timeData.name;
      this.getTime(this.timeData.lat, this.timeData.lng)
    }

    this.refreshIntervalId = setInterval(() => {

      if (this.timeData) {
        this.timeData = JSON.parse(localStorage.getItem('timeData'))
        if (this.timeData) {
          this.timeCity = this.timeData.name;
          this.getTime(this.timeData.lat, this.timeData.lng)
        }
      } else {
        this.getTime(this.latitude, this.longitude)
      }
    }, 10000);

    this.getNotificationCount();
    this.getCurrentLatLong();
  }

  ionViewDidLeave() {
    console.log("view did leave")
    clearInterval(this.refreshIntervalId);
  }

  checkUserProfile() {
    if (!this.currentUser.email) {
      $('.success_alert_box2').fadeIn().addClass('animate');
    }
  }

  /*** navigate to complete their profile */
  completeProfile() {
    this.router.navigate(['/home/profile']);
    $('.success_alert_box2').hide().removeClass('animate');
  }

  getTime(lat, lng) {
    this._userService.getTime(lat, lng).subscribe((res: any) => {
      this.currentTime = res.formatted;
      this.currentTime = moment(this.currentTime).format('hh:mm')
    }, err => {
      console.log("errrrrrr", err)
    })
  }

  /*** Get notification count */
  getNotificationCount() {
    const data = {
      id: this.currentUser.id
    }
    this._userService.getNotificationCount(data).subscribe((res: any) => {
      console.log("======notification api response", res);
      this.notificationCount = res.data.count;
    }, err => {
      console.log("errrrr", err)
    })
  }

  /*** Pull to refresh * @param {object} event */
  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewWillEnter();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  /*** Get Current Time */
  getCurrentTime() {

    this.currentTime = new Date().toISOString();
    this.currentTime = moment.utc(this.currentTime).local().format();
  }


  /*** Get current Location Lat Long */
  getCurrentLatLong() {
    console.log("==============currunt location===")
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log("respons of lat long", resp);
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.getLocation(this.latitude, this.longitude)
      const obj = {
        name: "Rajkot",
        lat: this.latitude,
        lng: this.longitude,
        country: "hjh"
      }

      if (!this.tempratureData) {
        this.tempratureCity = obj.name
        console.log("in current lat lng")
        this.getWeather(obj.lat, obj.lng)
      }
      if (!this.timeData) {
        this.timeCity = obj.name
        this.getTime(obj.lat, obj.lng)
      }

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  /*** Get Location Name using lat,long and temprature * @param {number} lat * @param {number} long */
  getLocation(lat, long) {
    console.log("lat long", lat, long);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };
    this.nativeGeocoder.reverseGeocode(lat, long, options)
    .then((result: NativeGeocoderResult[]) => {
      console.log("location", result[0].locality);
      this.cityName = result[0].locality;
      console.log("cityname", this.cityName);
      const obj = {
        name: this.cityName,
        lat: this.latitude,
        lng: this.longitude,
        country: "hjh"
      }
      console.log("object", obj)
      if (!this.tempratureData) {
        console.log("in if ofget location temp", obj)
        this.tempratureCity = obj.name
        this.getWeather(obj.lat, obj.lng)
      }
      if (!this.timeData) {
        console.log("in if of time", obj)
        this.timeCity = obj.name
        this.getTime(obj.lat, obj.lng)
      }

    })
    .catch((error: any) => {
      console.log("err get in cityname", error);
    });


  }

  getWeather(lat, long) {
    console.log("weather la long", lat, long)
    this._userService.getWeather(lat, long).subscribe((res: any) => {
      console.log("===weather res===", res);
      this.temperature = ((5 / 9) * (res.data.temperature - 32)).toFixed(0);
      console.log("temprature===>", this.temperature)
    }, (err) => {
      console.log(err)
    })
  }

  /*** Redirect to selecct city * @param {string} type */
  selectCity(type) {
    console.log("type", type);
    this.router.navigate(['/home/select-city/' + type])

  }
}