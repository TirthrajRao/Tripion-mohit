import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { data } from '../../data';
import { AppComponent } from '../../app.component';
declare const $: any;

@Component({
  selector: 'app-general-detail',
  templateUrl: './general-detail.component.html',
  styleUrls: ['./general-detail.component.scss'],
})
export class GeneralDetailComponent implements OnInit {

  generalDetailsForm: FormGroup;
  formUrl: any = [];
  counries = data.countries;
  curruntDate: string = new Date().toISOString();
  nextYear;
  submitted: Boolean = false;
  formData = JSON.parse(localStorage.getItem('form_data'));
  isTripInquiry: any = JSON.parse(localStorage.getItem('isTripInquiry'))
  currentUser = JSON.parse(localStorage.getItem('currentUser'))
  selectedFormCategory = JSON.parse(localStorage.getItem('selectedFormCategory'));
  isDisable: Boolean = false;
  loading: Boolean = false;
  groupTravel = 'No';
  infantsPassenger = 0;
  childrenPassenger = 0;
  adultsPassenger = 0;
  seniorPassenger = 0;
  constructor(
    public route: Router,
    public _tripService: TripService,
    public appComponent: AppComponent,
  ) {
    this.generalDetailsForm = new FormGroup({
      // name_in_passport: new FormControl('', [Validators.required]),
      // pssport_number: new FormControl('', [Validators.required, Validators.pattern('^(?!^0+$)[a-zA-Z0-9]{8,20}$')]),
      // dob: new FormControl('', Validators.required),
      // // place_of_birth: new FormControl('', [Validators.required]),
      // address_in_passport: new FormControl('', [Validators.required]),
      // duration: new FormControl('', [Validators.required]),
      // desination_country: new FormControl('', [Validators.required]),
      // place_name: new FormControl(''),
      // departure_date: new FormControl('', [Validators.required]),
      // intende_date: new FormControl('', [Validators.required]),
      // // passport_valid_date: new FormControl('', [Validators.required]),
      // duration_status: new FormControl('Flexible'),


      name_in_passport: new FormControl(''),
      pssport_number: new FormControl(''),
      duration: new FormControl(''),
      desination_country: new FormControl(''),
      place_name: new FormControl(''),
      departure_date: new FormControl(''),
      intende_date: new FormControl(''),
      duration_status: new FormControl('Flexible'),
      // group_travel: new FormControl('No'),
      // number_of_people:new FormControl(''),
      number_of_people: new FormGroup({
        'infants': new FormControl(''),
        'children': new FormControl(''),
        'adults': new FormControl(''),
        'senior_citizens': new FormControl('')
      })
    })
    console.log("lenfgrj", this.counries.length)
  }

  ngOnInit() {
    this.formUrl = JSON.parse(localStorage.getItem('formId'));
    this.nextYearCount();;

    $(document).ready(function () {
      $('#myselection').select2({
      });
    });

    $('#myselection').on('select2:select', (e) => {
      this.generalDetailsForm.controls.desination_country.setValue(e.params.data.id);
      console.log("data", this.generalDetailsForm.value);
    });

  }
  get f() { return this.generalDetailsForm.controls; }


  // Count next 12 year for expiry date of passport
  nextYearCount() {
    this.nextYear = this.curruntDate.split("-")[0];
    this.nextYear = this.nextYear++;
    this.nextYear = this.nextYear + +10;
  }
  /**
   * get next form
   * @param {Object} data 
   */
  nextForm(data) {
    this.checkLocalStorageData();

    this.submitted = true;
    if (this.generalDetailsForm.invalid) {
      return
    }

    //change date formate
    this.changeDateFormate(data);

    console.log("data", data)

    if (this.formUrl.length) {
      console.log("this.formUrl", this.formUrl)
      this.storeFormData(data);
      this.route.navigate(['/home/' + this.formUrl[0]])
    } else {
      if (!this.currentUser.email) {
        alert('Please add your email in your Profile');
        return;
      } else {
        let formObject = [{ "general_detail": data }]
        const obj = {
          id: this.currentUser.id,
          email: this.currentUser.email,
          form_category: this.selectedFormCategory.toString(),
          form_data: JSON.stringify(formObject)
        }
        console.log(obj);
        this.isDisable = true;
        this.loading = true;
        this._tripService.addInquiry(obj).subscribe((res: any) => {
          this.isDisable = false;
          this.loading = false;
          console.log("inquiry form res", res);
          localStorage.removeItem('form_data');
          localStorage.removeItem('selectedFormCategory');
          this.appComponent.sucessAlert("Inquiry Submitted Successfully", "Awesome");
          this.route.navigate(['/home']);
        }, (err) => {
          this.isDisable = false;
          this.loading = false;
          console.log(err);
          localStorage.removeItem('form_data');
          localStorage.removeItem('selectedFormCategory');
        })
      }

    }

  }

  // Store form data
  storeFormData(data) {
    if (data.group_travel == 'No') {
      delete data.group_travel_detail
    }
    console.log("data", data);
    const obj = {
      "general_detail": data
    }
    this._tripService.storeFormData(obj);
  }


  /**
   * Check and store data in local storage
   */
  checkLocalStorageData() {
    this.formUrl = JSON.parse(localStorage.getItem('formId'));
    if (this.formUrl[0] == 'general-detail') {
      this.formUrl.splice(0, 1);
      localStorage.setItem('formId', JSON.stringify(this.formUrl));
    }
    console.log("local storage form data", JSON.parse(localStorage.getItem('form_data')));
    const localStorageFormData = JSON.parse(localStorage.getItem('form_data'));
    let index;
    if (localStorageFormData.length) {
      let result;
      localStorageFormData.some((o, i) => {
        console.log(i, o);
        if (o.general_detail) {
          result = true
          index = i;
        }
      })

      console.log("result====>", result);
      if (result) {
        localStorageFormData.splice(index, 1)
      }
      console.log("index of general-detail in localstorage", localStorageFormData);
      if (localStorageFormData.length) {
        localStorage.setItem('form_data', JSON.stringify(localStorageFormData))
      } else {
        localStorage.setItem('form_data', JSON.stringify(''))
      }
    }
  }


  /**
   * Change date formate
   * @param {object} data 
   */
  changeDateFormate(data) {
    if (data.departure_date.includes("T")) {
      data.departure_date = data.departure_date.split("T")[0];
    }

    if (data.intende_date.includes("T")) {
      data.intende_date = data.intende_date.split("T")[0];
    }
    return data
  }

  //Decrement passangers count
  decrement(type) {
    console.log("type in dec", type, this.generalDetailsForm.controls.number_of_people.value);
    if (type == "infants") {
      if (this.infantsPassenger)
        this.infantsPassenger--;
      this.generalDetailsForm.controls.number_of_people.value.infants = this.infantsPassenger;
    } else if (type == "children") {
      if (this.childrenPassenger)
        this.childrenPassenger--;
      this.generalDetailsForm.controls.number_of_people.value.children = this.childrenPassenger;
    } else if (type == 'adults') {
      if (this.adultsPassenger)
        this.adultsPassenger--;
      this.generalDetailsForm.controls.number_of_people.value.adults = this.adultsPassenger;
    } else if (type == 'senior') {
      if (this.seniorPassenger)
        this.seniorPassenger--;
      this.generalDetailsForm.controls.number_of_people.value.senior_citizens = this.seniorPassenger;
    }
  }

  //Increment passangers count
  increment(type) {
    console.log("type in inc", type)
    if (type == "infants") {
      this.infantsPassenger++;
      this.generalDetailsForm.controls.number_of_people.value.infants = this.infantsPassenger;
    } else if (type == "children") {
      this.childrenPassenger++;
      this.generalDetailsForm.controls.number_of_people.value.children = this.childrenPassenger;
    } else if (type == 'adults') {
      this.adultsPassenger++;
      this.generalDetailsForm.controls.number_of_people.value.adults = this.adultsPassenger;
    } else if (type == 'senior') {
      this.seniorPassenger++;
      this.generalDetailsForm.controls.number_of_people.value.senior_citizens = this.seniorPassenger;
    }
  }

}
