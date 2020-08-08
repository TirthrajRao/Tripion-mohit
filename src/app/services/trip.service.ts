import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../config '

@Injectable({
  providedIn: 'root'
})
export class TripService {
  // formData = JSON.parse(localStorage.getItem('form_data'));
  formData;
  constructor(private http: HttpClient) { }

  /**
   * Store form data
   * @param {object} data 
   */
  storeFormData(data) {
    console.log("formData", data);
    const formRes = [];
    this.formData = JSON.parse(localStorage.getItem('form_data'));
    if (this.formData) {
      console.log(this.formData);
      if (this.formData.length) {
        formRes.push(...this.formData, data);
      } else {
        formRes.push(this.formData, data)
      }
      console.log(formRes)
      localStorage.setItem('form_data', JSON.stringify(formRes))
    } else {
      formRes.push(data)
      localStorage.setItem("form_data", JSON.stringify(formRes));
    }
  }

  /**
   * Add safe to travel request
   * @param {Object} data 
   */
  addSafeToTravelReq(data) {
    return this.http.post(config.baseApiUrl + 'submit-form', data)
  }

  /**
   * Get safe travel response of requests
   * @param {object} data 
   */
  getSafeToTravelResponse(data) {
    return this.http.post(config.baseApiUrl + 'get-safe-travel', data)
  }

  /**
   * Get Form Category list
   */
  getFormCategoryList() {
    return this.http.get(config.baseApiUrl + 'form-category');
  }

  /**
   * Add Inquiry
   * @param {Object} data 
   */
  addInquiry(data) {
    console.log(data);
    return this.http.post(config.baseApiUrl + 'submit-form', data);
  }

  /**
   * Add FFP request
   * @param {Object} data 
   */
  addFFPRequest(data) {
    return this.http.post(config.baseApiUrl + 'add-flight', data)
  }

  editFFPRequest(data) {
    return this.http.post(config.baseApiUrl + 'update-flight', data)
  }

  /**
   * Get FFP responces
   * @param {Object} data 
   */
  getFfpResponse(data) {
    return this.http.post(config.baseApiUrl + 'get-flight', data)
  }

  /**
   * Get all trips
   * @param {object} data 
   */
  getAllTrips(data) {
    return this.http.post(config.baseApiUrl + 'home', data)
  }

  /**
   * Get Single Trip Details
   * @param {Object} data 
   */
  getSingleTripDetail(data) {
    return this.http.post(config.baseApiUrl + 'single-inquiry', data)
  }

  /**
   * Get Single Plan Details
   * @param {object} data 
   */
  getPlanDetail(data) {
    return this.http.post(config.baseApiUrl + 'single-plan', data)
  }

  /**
   * Get All Pllans Of trip
   * @param {Object} data 
   */
  getAllPlans(data) {
    return this.http.post(config.baseApiUrl + 'plans', data);
  }
  /**
   * Send Selected Plan
   * @param {object} data 
   */
  sendPlan(data) {
    return this.http.post(config.baseApiUrl + 'book-plan', data);
  }
  /**
   * Get Trip Timeline
   * @param {Object} data 
   */
  getTripTimeline(data) {
    return this.http.post(config.baseApiUrl + 'get-timeline', data)
  }

  /**
   * Get Timeline Day details
   * @param {Object} data 
   */
  getDayDetail(data) {
    return this.http.post(config.baseApiUrl + 'timeline-detail', data)
  }

  /**
   * Get document request of inquiry
   * @param {Object} data 
   */
  getDocumentReq(data) {
    return this.http.post(config.baseApiUrl + 'get-doc-request', data);
  }

  /**
   * Get Past trips
   * @param {object} data 
   */
  getPastTrip(data) {
    return this.http.post(config.baseApiUrl + 'past-trip', data);
  }

  /**
   * Get Quotations of trip
   * @param {object} data 
   */
  getQuotations(data) {
    return this.http.post(config.baseApiUrl + 'get-quotation', data);
  }

  /**
   * Add Passport Inquiry
   * @param {object} data 
   */
  addPassportForm(data) {
    return this.http.post(config.baseApiUrl + 'submit-form', data);
  }
  /**
   * Trip payment
   */
  tripPayment(data) {
    return this.http.post(config.baseApiUrl + 'pay-now', data);
  }

  /**
   * Do things your way
   * @param {object} data 
   */
  doThingYourWay(data) {
    return this.http.post(config.baseApiUrl + 'book-with-other', data)
  }

  /**
   * Get Destination Finder Request
   */
  allDestinationReq(data) {
    return this.http.post(config.baseApiUrl + 'get-destination', data);
  }

  /**
   * Get Destination Req Detail
   * @param {Object} data 
   */
  getDestinationReqDetail(data) {
    return this.http.post(config.baseApiUrl + 'single-destination', data);
  }

  /**
   * Add Destination Finder Request
   * @param {object} data 
   */
  addDestinationReq(data){
    return this.http.post(config.baseApiUrl + 'add-destination', data);
  }

  /**
   * Add Other details for destination finder req.
   * @param {Object} data 
   */
  addDestinationOtherFormData(data){
    return this.http.post(config.baseApiUrl + 'add-destination-form', data);
  }

  /**
   * Get General quotation
   * @param {object} data 
   */
  getGeneralQuotation(data){
    return this.http.post(config.baseApiUrl + 'get-all-quotation', data);
  }

  /**
   * Get General quotation
   * @param {object} data 
   */
  getSingleQuotation(data){
    return this.http.post(config.baseApiUrl + 'get-single-quotation/', data);
  }

  /**
  *Destination Finder Product Page
  * @param {object} data
  */
  getDestinationReqProduct(data){
    return this.http.post( config.baseApiUrl + 'get-places', data);
  } 

  /**
  *Destination Finder Product Page
  * @param {object} data
  */
  getDestinationReqFetureImg(data){
    return this.http.post( config.baseApiUrl + 'get-featured-places', data);
  } 

  /**
  *Destination Finder Detail Page
  * @param {object} data 
  */
  getDestinationDetail(data){
    console.log("the data is -------------------->", data);
    return this.http.post( config.baseApiUrl + 'single-places', data);
  }

  /**
  *Destination Finder Fetured Functionality Page
  * @param {object} data
  */
  getDestinationReqFeture(data){
    return this.http.post( config.baseApiUrl + 'filter-places', data);
  }

  /**
  *Destination Finder Fetured Functionality Page
  * @param {object} data
  */
  getDestinationReqPlaceTages(data){
    return this.http.post( config.baseApiUrl + 'place-tags', data);
  }

  /**
  *Destination Finder Fetured Functionality Page
  * @param {object} data
  */
  getDestinationReqPlaceSubTages(data){
    return this.http.post( config.baseApiUrl + 'place-subtags', data);
  }

  /**
  *Destination Finder Fetured Functionality Page
  * @param {object} data
  */
  addDestination(data){
    console.log("the data of an service of ====>", data);
    return this.http.post( config.baseApiUrl + 'add-destination', data);
  }
}
