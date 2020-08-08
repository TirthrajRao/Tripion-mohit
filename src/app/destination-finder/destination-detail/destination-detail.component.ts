import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { AppComponent } from '../../app.component';
declare const $: any;

@Component({
  selector: 'app-destination-detail',
  templateUrl: './destination-detail.component.html',
  styleUrls: ['./destination-detail.component.scss'],
})
export class DestinationDetailComponent implements OnInit {
  destinationId: any;
  loading: Boolean = false;
  curruntUser = JSON.parse(localStorage.getItem('currentUser'));
  images: any = [];
  Destinationdetails: any = [];
  
  constructor(
    public route: ActivatedRoute,
    public _tripService: TripService,
    public appComponent: AppComponent,
    public _router: Router
    ) {
    this.route.params.subscribe((param) => {
      this.destinationId = param.id
    }); 
  }

  ngOnInit() {
    this.getDestinationDetail();
  }
  
  getDestinationDetail() {
    this.loading = true;
    const obj = {
      id: this.curruntUser.id,
      place_id: this.destinationId
    }
    console.log("obj", obj);
    this._tripService.getDestinationDetail(obj).subscribe((res : any) => {
      this.Destinationdetails[0] = res.data;
      this.images = res.data.slider_img;
      this.createSlider();
      localStorage.setItem('place_name', JSON.stringify(res.data.name));
      this.loading = false;
      console.log("the res of the data correct is ---------->", res);
    }, (err) => {
      this.loading = false;
      console.log("the err of the data correct is ---------->", err);
    })
  }

  /**
  * Send Us Inquiry
  */
  sendUsInquiry(){
    var id = this.curruntUser.id;
    this._router.navigate(['/home/destination-other-detail/' + id]);
    localStorage.setItem('form_data', JSON.stringify(this.Destinationdetails[0].name))
  }

  /**
   * Create Slider
   */
   createSlider() {
     $(document).ready(function () {
       if ($('.image-slider').hasClass('slick-initialized'))
         $('.image-slider').slick('unslick');
       setTimeout(() => {
         $('.image-slider').not('.slick-initialized').slick({
           infinite: true,
           dots: true,
           slidesToShow: 1,
           arrows: false,
         });
       }, 200);
     });
   }
 }
