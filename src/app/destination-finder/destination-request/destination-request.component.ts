import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { ModalController } from '@ionic/angular';
import { AppComponent } from '../../app.component';

declare const $: any;
@Component({
  selector: 'app-destination-request',
  templateUrl: './destination-request.component.html',
  styleUrls: ['./destination-request.component.scss'],
})
export class DestinationRequestComponent implements OnInit {
  loading: Boolean = false;
  curruntUser = JSON.parse(localStorage.getItem('currentUser'));
  destinationReq: any = [];
  details: any = [];
  placeTags: any = [];
  allSlugs: any = [];
  resultsOfSelectedSlugs:any;
  subPlaces:any = [];

  constructor(
    public router: Router,
    public _tripService: TripService,
    public appComponent: AppComponent,
    public modalController: ModalController
    ) { 
    $(document).ready(function () {
      $('.country-slider').slick({
        infinite: true,
        dots: false,
        slidesToShow: 4,
        arrows: false, 
      });
    })
  }

  ngOnInit() {
    this.openModal();
  }

  ionViewWillEnter(){
    this.destinationReq = []
    this.getAllInquiry();
    this.allPaces();
  }

  
  getAllInquiry() {
    this.loading = true;
    const data = {
      id: this.curruntUser.id
    }
    console.log("the data of get all -------------->", data);
    this._tripService.getDestinationReqProduct(data).subscribe((res: any) => {
      console.log("res", res);
      this.details = res.data;
      this.destinationReq = res.data;
      this.loading = false;
      this.createSlider();
    }, err => {
      console.log("err", err);
      this.loading = false;
      this.appComponent.errorAlert(err.error.message);
    });
  }

  productDetail(destination){
    console.log("the products is ============>", destination);
    this.router.navigate(['/home/destination-detail/'+ destination.id])
  }

  selectTab(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    console.log("the value of selectTab is --------->", value);
    var obj = {
      id : this.curruntUser.id,
      filter_data: value
    }

    var data = {
      id: this.curruntUser.id
    }
    this.loading = true;

    if (value == 'feture') {
      console.log("the condition is working");
      this._tripService.getDestinationReqProduct(data).subscribe((res: any) => {
        console.log("res", res);
        this.destinationReq = null;
        this.destinationReq = res.data;
        this.createSlider();
        this.loading = false;
      }, err => {
        console.log("err", err);
        this.loading = false;
        this.appComponent.errorAlert(err.error.message);
      });
    }
    else {
      this._tripService.getDestinationReqFeture(obj).subscribe((res: any) => {
        this.destinationReq = res.data;
        this.createSlider();
        this.loading = false;
        console.log("the res of tabs feture image ------------>", res);
      }, (err) => {
        console.log("the err of tabs feture image ------------>", err);
      })
    }   
  }

  createSlider(){
    $(document).ready(function () {
      if ($('.content-slider').hasClass('slick-initialized'))
        $('.content-slider').slick('unslick');
      setTimeout(() => {
        $('.content-slider').not('.slick-initialized').slick({
          infinite: true,
          dots: true,
          slidesToShow: 1,
          arrows: false,
        });
      }, 200);
    });
  }

  openModal() {
    $('#forgot-psw').click(function () {
      console.log("====")
      $('#forgot-password').fadeIn();
    });
    $('#forgot-password .modal_body').click(function (event) {
      event.stopPropagation();
    });
    $('#forgot-password').click(() => {
      $('#forgot-password').fadeOut();
    });
  }

  allPaces(){
    var data = {
      id: this.curruntUser.id
    }

    this._tripService.getDestinationReqPlaceTages(data).subscribe((res: any) => {
      console.log("the all place of res ======>", res);
      this.placeTags = res.data;
      this
    }, (err) => {
      console.log("the all place of err ======>", err);
    })
  }

  placeTag(id, value){
    console.log("the placeTag value of an id is ==========>", id, value);
    var data = {
      id: this.curruntUser.id,
      term_id: id
    }
    this.loading = true;
    this._tripService.getDestinationReqPlaceSubTages(data).subscribe((res: any) => {
      console.log("the sub placeTag res of =======>", res);
      this.subPlaces = res.data;
      this.loading = false;
    }, (err) => {
      console.log("the sub placeTag err of =======>", err);
    })
  }

  selectPlace(id, value){
    console.log("the selectPlace of the ------->", id, value);

    if(this.allSlugs.includes(value.slug)){
      let index = this.allSlugs.indexOf(value.slug)
      this.allSlugs.splice(index, 1);
      console.log("the allSlugs is the ========>", this.allSlugs);
      this.resultsOfSelectedSlugs = this.allSlugs.join(',');
      console.log("the results of the slugs is --=>", this.resultsOfSelectedSlugs);   
    }
    else{
      this.allSlugs.push(value.slug)
      console.log('working id is -----------?',this.allSlugs)
      this.resultsOfSelectedSlugs = this.allSlugs.join(',');
      console.log("the results of the slugs is --=>", this.resultsOfSelectedSlugs);
    }  
  }

  placeFilter(){
    var data = {
      id: this.curruntUser.id,
      filter_data: this.resultsOfSelectedSlugs
    }

    this._tripService.getDestinationReqFeture(data).subscribe((res: any) => {
      console.log("the filtert of sub places is the ============>", res);
      this.destinationReq = res.data;
    }, (err) => {
      console.log("the filtert of sub places err is the ============>", err);
    })
  }
}
