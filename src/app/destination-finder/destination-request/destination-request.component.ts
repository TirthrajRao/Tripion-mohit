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
  slideOpts:any;
  // isActive:boolean = false;
  isDisplay:boolean = false;
  
  constructor(
    public router: Router,
    public _tripService: TripService,
    public appComponent: AppComponent,
    public modalController: ModalController
    ) { 
    $(document).ready(function(){
      $("#feture").css("color", "black");
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
    // this.openModal();
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
      this.isDisplay = true;

      this.loading = false;
      // this.createSlider();
      // this.createAccordian();
      $(document).ready(function(){
        $("#feture").css("color", "black");
      });
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
    // this.isActive = false;
      this.isDisplay = false;

    var obj = {
      id : this.curruntUser.id,
      filter_data: value
    }

    var data = {
      id: this.curruntUser.id
    }
    this.loading = true;

    if (value == 'feture') {
      $(document).ready(function(){
        $("#feture").css("color", "black");
      });
      // this.isActive = true;
      this.isDisplay = true;
      console.log("the condition is working");
      this._tripService.getDestinationReqProduct(data).subscribe((res: any) => {
        console.log("res", res);
        this.destinationReq = null;
        this.destinationReq = res.data;
        // this.createSlider();
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
        // this.createSlider();
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

  createAccordian(){
    var acc = document.getElementsByClassName("accordion");
    var i;
    console.log("ACC", acc)
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        console.log("clicked")
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }

  openModal() {
    console.log("====")
    this.createAccordian();
    $('#product-modal').fadeIn();
    $('#product-modal .modal_body').click(function (event) {
      event.stopPropagation();
    });
    // $('#product-modal').click(() => {
    //   $('#product-modal').fadeOut();
    // });
  }

  closeModal() {
    this.createAccordian();
    $('#product-modal').fadeOut();
  }

  allPaces(){
    var data = {
      id: this.curruntUser.id
    }

    this._tripService.getDestinationReqPlaceTages(data).subscribe((res: any) => {
      this.placeTags = res.data;

      this.placeTags.map((place) => {
        place.subPlaces = [];
      })
      console.log("the all place of res ======>", this.placeTags);

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

      const index = this.placeTags.findIndex((place) => {
        return place.id === id
      })
      this.loading = false;
      this.placeTags[index].subPlaces = JSON.parse(JSON.stringify(res.data));
      console.log("the index of the id =======>", this.placeTags);

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
    this.loading = true;
    this._tripService.getDestinationReqFeture(data).subscribe((res: any) => {
      console.log("the filtert of sub places is the ============>", res);
      this.destinationReq = res.data;
      this.loading = false;
      this.isDisplay = false;
      $('#product-modal').fadeOut();
      this.createAccordian();
       $(document).ready(function(){
        $("#feture").css("color", "#7f8dab");
      });
    }, (err) => {
      console.log("the filtert of sub places err is the ============>", err);
    })
  }
}