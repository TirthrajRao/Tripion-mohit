import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { TripService } from 'src/app/services/trip.service';
import * as _ from 'lodash';
declare const $: any;
@Component({
  selector: 'app-accomodation-inquiry',
  templateUrl: './accomodation-inquiry.component.html',
  styleUrls: ['./accomodation-inquiry.component.scss'],
})
export class AccomodationInquiryComponent implements OnInit {
  formUrl: any = [];
  accomodationForm: FormGroup;
  submitted: Boolean = false;
  roomsArray: any = [];
  culinaryArray: any = [];
  acomodationArray: any = [];
  room: any;
  slideOpts = {
    initialSlide: 1,
    speed: 100
  };
  roomCategory = [
    {
      url: 'assets/images/accomodation/1.jpeg',
      name: 'Basic (Standard) Room',
      isSelected: false
    },
    {
      url: 'assets/images/accomodation/2.jpeg',
      name: 'Room With a View(Beach,City,Valley,Garden,Pool)',
      isSelected: false
    },
    {
      url: 'assets/images/accomodation/3.jpeg',
      name: 'Suit',
      isSelected: false
    },
    {
      url: 'assets/images/accomodation/4.jpeg',
      name: 'Villa',
      isSelected: false
    },
    {
      url: 'assets/images/accomodation/5.jpeg',
      name: 'Cottages',
      isSelected: false
    },
    {
      url: 'assets/images/accomodation/6.jpeg',
      name: 'Balcony',
      isSelected: false
    },
    {
      url: 'assets/images/accomodation/7.jpeg',
      name: 'Penthouse',
      isSelected: false
    }
  ]


  // formData = JSON.parse(localStorage.getItem('form_data'));

  constructor(public route: Router, private fb: FormBuilder, public _tripService: TripService) {
    this.formUrl = JSON.parse(localStorage.getItem('formId'));

    this.accomodationForm = this.fb.group({
      // accomodation_type: new FormControl('', [Validators.required]),
      // room_category_preference: new FormControl('', [Validators.required]),
      // smoking_room: new FormControl('No'),
      // wheelchair_accessible: new FormControl('No'),
      // special_request: new FormControl(''),
      // meal_plan: new FormControl('CP ( Continental Plan ) - Only Breakfast'),
      // culinary_preferrence: new FormControl('Vegetarian'),
      // culinary_special_request: new FormControl(''),
      // rooms: this.fb.array([], [Validators.required]),


      accomodation_type: new FormControl(''),
      location_specific_accommodation_detail: new FormControl(''),
      amenities_specific_accommodation_detail: new FormControl(''),
      room_category_preference: new FormControl(''),
      smoking_room: new FormControl(''),
      wheelchair_accessible: new FormControl(''),
      special_request: new FormControl(''),
      meal_plan: new FormControl('CP ( Continental Plan ) - Only Breakfast'),
      culinary_preferrence: new FormControl('Vegetarian'),
      culinary_special_request: new FormControl(''),
      rooms: this.fb.array([]),
    })
    this.room = this.accomodationForm.controls.rooms as FormArray;
  }
  ngOnInit() { }
  get f() { return this.accomodationForm.controls; }

  // open next form function
  nextForm(data) {
    this.submitted = true;
    if (this.accomodationForm.invalid) {
      return
    }
    this.checkLocalStorageData();
    this.storeFormData(data);
    console.log(data);
    this.route.navigate(['/home/' + this.formUrl[0]])
  }

  // Store form data
  storeFormData(data) {
    if (!data.accomodation_type.includes('Amenities Specific Accommodation')) {
      delete data.amenities_specific_accommodation_detail
    }
    if (!data.accomodation_type.includes('Location Specific Accommodation')) {
      delete data.location_specific_accommodation_detail
    }
    console.log("accomodation data", data);
    const obj = {
      'accomodation': data
    }
    this._tripService.storeFormData(obj);
  }

  /**
   * Add Rooms
   */
  addRoom() {

    console.log("all rooms", this.accomodationForm.value.rooms)
    this.room.push(this.fb.group({
      infants: '0',
      children: '0',
      adults: '0',
      extra_bed: '0'
    }));
  }

  /**
   * Delete eomm
   * @param {Number} index 
   */
  deleteRoom(index) {
    this.room.removeAt(index)
  }



  decrement(type, index) {
    if (type == "infants") {
      if (this.accomodationForm.value.rooms[index].infants > 0)
        this.accomodationForm.value.rooms[index].infants--;
    } else if (type == "children") {
      if (this.accomodationForm.value.rooms[index].children > 0)
        this.accomodationForm.value.rooms[index].children--;
    } else if (type == 'adults') {
      if (this.accomodationForm.value.rooms[index].adults > 0)
        this.accomodationForm.value.rooms[index].adults--;
    } else if (type == "bed") {
      if (this.accomodationForm.value.rooms[index].extra_bed > 0)
        this.accomodationForm.value.rooms[index].extra_bed--;
    }
  }

  increment(type, index) {
    if (type == "infants") {
      this.accomodationForm.value.rooms[index].infants++
    } else if (type == "children") {
      this.accomodationForm.value.rooms[index].children++
    } else if (type == 'adults') {
      this.accomodationForm.value.rooms[index].adults++
    } else if (type == 'bed') {
      this.accomodationForm.value.rooms[index].extra_bed++
    }
  }

  /**
   * Check and store data in local storage
   */
  checkLocalStorageData() {
    this.formUrl = JSON.parse(localStorage.getItem('formId'));
    if (this.formUrl[0] == 'accomodation') {
      this.formUrl.splice(0, 1);
      localStorage.setItem('formId', JSON.stringify(this.formUrl));
    }
    console.log("local storage form data", JSON.parse(localStorage.getItem('form_data')));
    const localStorageFormData = JSON.parse(localStorage.getItem('form_data'))
    let index;
    if (localStorageFormData.length) {
      let result;
      localStorageFormData.some((o, i) => {
        console.log(i, o);
        if (o.accomodation) {
          result = true
          index = i;
        }
      })
      console.log("result====>", result, index);
      if (result) {
        localStorageFormData.splice(index, 1)
      }
      console.log("index of accomodation in localstorage", localStorageFormData);
      localStorage.setItem('form_data', JSON.stringify(localStorageFormData))
    }
  }

  /**
   * Set Value of culinary preferences value
   */
  selectCulinary(e) {
    if (!this.culinaryArray.includes(e.detail.value)) {
      this.culinaryArray.push(e.detail.value);
    } else {
      var index = this.culinaryArray.indexOf(e.detail.value);
      this.culinaryArray.splice(index, 1);
    }
    console.log(this.culinaryArray);
    this.accomodationForm.controls.culinary_preferrence.setValue(this.culinaryArray);
  }
  /**
   * Set Value o faccommodation type 
   */
  selectAccommodationType(e) {
    if (!this.acomodationArray.includes(e.detail.value)) {
      this.acomodationArray.push(e.detail.value);
    } else {
      var index = this.acomodationArray.indexOf(e.detail.value);
      this.acomodationArray.splice(index, 1);
    }
    console.log(this.acomodationArray);
    this.accomodationForm.controls.accomodation_type.setValue(this.acomodationArray);
  }


  selectRoomCategory(data, index) {
    _.forEach(this.roomCategory, (option, i) => {
      if ($('.active-' + i).hasClass('animate-icon')) {
        console.log("has class")
        $('.active-' + i).removeClass('animate-icon');
      }
      if (option.name == data.name) {
        option.isSelectIcon = !option.isSelectIcon;
        if (option.isSelectIcon) {
          console.log("in if")
          this.accomodationForm.controls.room_category_preference.setValue(data.name);
          $('.active-' + index).removeClass('unselect-icon');
          $('.active-' + index).addClass('animate-icon');
        } else {
          $('.active-' + index).removeClass('animate-icon');
          $('.active-' + index).addClass('unselect-icon');
          this.accomodationForm.controls.room_category_preference.setValue('');
        }
      } else {
        option.isSelectIcon = false;
      }
    })
    console.log("occian of the vacation", this.accomodationForm.value.room_category_preference);
  }

  /**
   * set Wheelchair asistance value
   */
  selectSmokingRomm(e) {
    console.log(e.detail)
    if (e.detail.checked) {
      this.accomodationForm.controls.smoking_room.setValue(e.detail.value)
    } else {
      this.accomodationForm.controls.smoking_room.setValue('No')
    }
  }

  /**
   * set Wheelchair asistance value
   */
  selectWheelChair(e) {
    console.log(e.detail)
    if (e.detail.checked) {
      this.accomodationForm.controls.wheelchair_accessible.setValue(e.detail.value)
    } else {
      this.accomodationForm.controls.wheelchair_accessible.setValue('No')
    }
  }
}
