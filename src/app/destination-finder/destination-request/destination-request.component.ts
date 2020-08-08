import { Component, OnInit, Injector, ViewChild  } from '@angular/core';
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
  isDisplay:boolean = false;

  
  constructor(
    public router: Router,
    public _tripService: TripService,
    public appComponent: AppComponent,
    public modalController: ModalController
    ) { 
    $(document).ready(function(){
      $("#feture").css("color", "#0575e6");
    });

    $(document).ready(function () {
      $('.country-slider').slick({
        infinite: true,
        dots: false,
        slidesToShow: 3,
        arrows: false, 
      });
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.destinationReq = []
    this.details = []
    this.getAllInquiry();
    this.allPaces();
  }

  /**
  * Get All Inquiry 
  */  
  getAllInquiry() {
    this.loading = true;
    const data = {
      id: this.curruntUser.id
    }
    console.log("the data of get all -------------->", data);
    this._tripService.getDestinationReqProduct(data).subscribe((res: any) => {
      console.log("res", res);
      this.details = res.data;
      this.loading = false;
      this.isDisplay = true;
      this.destinationReq = res.data;
      $(document).ready(function(){
        $("#feture").css("color", "#0575e6");
      });
    }, (err) => {
      console.log("err", err);
      this.loading = false;
      this.appComponent.errorAlert(err.error.message);  
    });
  }
  
  /**
  * Open Destination Inner Page
  */
  productDetail(destination){
    console.log("the products is ============>", destination);
    this.router.navigate(['/home/destination-detail/'+ destination.id])
  }

  /**
  * Select Continents
  */
  selectTab(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    console.log("the value of selectTab is --------->", value);
    this.isDisplay = false;
    this.loading = true;

    var obj = {
      id : this.curruntUser.id,
      filter_data: value
    }

    var data = {
      id: this.curruntUser.id
    }

    if (value == 'feture') {
      $(document).ready(function(){
        $("#feture").css("color", "#0575e6");
      });
      this.isDisplay = true;
      this._tripService.getDestinationReqProduct(data).subscribe((res: any) => {
        console.log("res", res);
        this.destinationReq = null;
        this.destinationReq = res.data;
        this.loading = false;
      }, err => {
        console.log("err", err);
        this.loading = false;
        this.appComponent.errorAlert(err.error.message);
      });
    }
    else {
      this.isDisplay = false;
      console.log("the details of an array is ------>", this.details);
      $(document).ready(function(){
        $("#feture").css("color", "#7f8dab");
      });
      this._tripService.getDestinationReqFeture(obj).subscribe((res: any) => {
        this.destinationReq = res.data;
        this.loading = false;
        console.log("the res of tabs feture image ------------>", res);
      }, (err) => {
        console.log("the err of tabs feture image ------------>", err);
      })
    }   
  }

  /**
  * Open Model
  */
  openModal() {
    console.log("====")
    $('#product-modal').fadeIn();
    this.createAccordian();
    $('#product-modal .modal_body').click(function (event) {
      event.stopPropagation();
      console.log("fadeIN called");
    });
  }

  /**
  * Create Accordian
  */
  createAccordian(){
    var acc = document.getElementsByClassName("accordion");
    var i;
    console.log("ACC", acc)
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }

  /**
  * Close Model
  */
  closeModal() {
    $('#product-modal').fadeOut();
    this.createAccordian();
  }

  /**
  * Filter Main Places
  */
  allPaces(){
    var data = {
      id: this.curruntUser.id
    }
    this._tripService.getDestinationReqPlaceTages(data).subscribe((res: any) => {
      this.placeTags = res.data;
      console.log("the all place of filter res ====>", res);
    }, (err) => {
      console.log("the all place of err ======>", err);
    })
  }

  /**
  * Filter in Select Subplaces  
  */
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

  /**
  * Filter Places
  */
  placeFilter(){
    var data = {
      id: this.curruntUser.id,
      filter_data: this.resultsOfSelectedSlugs
    }
    this.createAccordian();
    this.loading = true;
    this._tripService.getDestinationReqFeture(data).subscribe((res: any) => {
      console.log("the filtert of sub places is the ============>", res);
      this.destinationReq = res.data;
      this.loading = false;
      this.isDisplay = false;
      $('#product-modal').fadeOut();
       $(document).ready(function(){
        $("#feture").css("color", "#7f8dab");
      });
    }, (err) => {
      console.log("the filtert of sub places err is the ============>", err);
    })
  }
}
