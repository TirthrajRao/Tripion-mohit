import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
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
	selector: 'app-travel-inquiry',
	templateUrl: './travel-inquiry.component.html',
	styleUrls: ['./travel-inquiry.component.scss'],
})
export class TravelInquiryComponent implements OnInit {

	currentUser = JSON.parse(localStorage.getItem('currentUser'));
	allTrips: any = [];
	currentTime;
	refreshIntervalId;
	loading: Boolean = false;
	previousUrl;
	upCommingTrip: any;
	curruetDate: string = new Date().toISOString();
	diffDays: any = [];;
	searchedResult: any = [];

	constructor(
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

		this.curruetDate = this.curruetDate.split('T')[0];
		console.log("currentdate", this.curruetDate);

		router.events
		.pipe(
			filter(event => event instanceof RoutesRecognized),
			pairwise()
			)
		.subscribe((e: any) => {
			console.log("eeee", e);
			if (e[1].urlAfterRedirects == '/home/home-page') {
				this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
				// console.log("urllllll", e[0].urlAfterRedirects);
				this.previousUrl = e[0].urlAfterRedirects;
				if (this.previousUrl.includes('other-details') || this.previousUrl.includes('login') || this.previousUrl.includes('general-detail') || this.previousUrl.includes('signup') || this.previousUrl.includes('premium-account') || this.previousUrl.includes('passport') || this.previousUrl.includes('all-plan') || this.previousUrl.includes('plan-option')
					) {
					console.log("in if");
				this.allTrips = []
				this.getAllTrips();
			}
		}
	});
	}

	ngOnInit() {
	}

	ionViewWillEnter() {
		console.log("in enter");
		this.getAllTrips();
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

	/*** display upcoming trip title */
	upCommingTripData() {
		_.forEach(this.allTrips, (trip, index) => {
			if (trip.timeline_date) {
				const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
				const firstDate: any = new Date(this.curruetDate);
				const secondDate: any = new Date(trip.timeline_date);
				const diff = Math.round(Math.abs((firstDate - secondDate) / oneDay));
				if (diff != 0)
					this.diffDays.push({ diff: diff, 'name': trip.inquiry_name })
				this.diffDays.sort((a, b) => (a.diff > b.diff) ? 1 : -1);
				if (this.diffDays[0].diff <= 30) {
					this.upCommingTrip = this.diffDays[0].name
				} else {
					this.upCommingTrip = 'Welcome'
				}
			}
		})
	}

	/*** Pull to refresh * @param {object} event */
	doRefresh(event) {
		console.log('Begin async operation');
		this.ionViewWillEnter();
		this.getAllTrips();
		setTimeout(() => {
			event.target.complete();
		}, 2000);
	}

	/*** Get All Trips */
	getAllTrips() {
		const data = {
			id: this.currentUser.id
		}
		this.loading = true;
		this._tripService.getAllTrips(data).subscribe((res: any) => {
			this.allTrips = res.data;
			console.log(this.allTrips);
			this.checkUserProfile();
			this.loading = false;
		}, (err) => {
			this.appComponent.errorAlert(err.error.message);
			console.log(err);
			this.loading = false;
		})
	}

	/*** Move to plan option page * @param {Number} inquiryId */
	getPlanOption(data) {
		console.log("inquiryid", data, data.form_id);
		if (data.list_of_inquiry.includes('Safe to travel')) {
			this.router.navigate(['/home/safe-travel']);
		} else {
			if (!data.is_direct) {
				if (data.plan_selected == 0) {
					this.router.navigate(['/home/all-plan/' + data.inquiry_id], { queryParams: { formId: data.form_id } });
				} else {
					console.log("in elseeeeeeee")
					if (data.status[0] == "Ongoing" && data.timeline_date) {
						console.log("ingoing trip", data.status[0]);
						this.router.navigate(['home/trip-planing/' + data.inquiry_id])
					} else {
						console.log("in else")
						this.router.navigate(['/home/plan-option/' + data.inquiry_id]);
					}
				}
			} else {
				this.router.navigate(['/home/plan-option/' + data.inquiry_id]);
			}
		}
	}
}