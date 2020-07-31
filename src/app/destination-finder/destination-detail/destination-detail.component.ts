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
  details: any;
  images: any = [];
  documents: any = [];
  Destinationdetails: any = [];
  slideOpts:any;
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

    //my_function
    this._tripService.getDestinationDetail(obj).subscribe((res : any) => {
      this.Destinationdetails[0] = res.data;
      this.images = res.data.slider_img;
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
      this.loading = false;

      console.log("the res of the data correct is ---------->", res);
    }, (err) => {
      this.loading = false;
      console.log("the err of the data correct is ---------->", err);
    })

    // this._tripService.getDestinationDetail(obj).subscribe((res: any) => {
      //   console.log("res===>", res);
      //   this.details = res.data;
      //   this.details.form_response.destination_pdf.map((image) => {
        //     if (image.mime_type.includes('image')) {
          //       this.images.push(image)
          //     } else {
            //       this.documents.push(image)
            //     }
            //   })
            //   console.log(this.images)
            //   setTimeout(() => {
              //     this.createSlider();
              //   }, 1)
              //   this.loading = false;
              // }, err => {
                //   console.log("err", err);
                //   this.loading = false;
                //   this.appComponent.errorAlert(err.error.message)
                // })
              }


  /**
   * Create Slider
   */
   // createSlider() {
     //   $('.plan_images').slick({
       //     infinite: true,
       //     slidesToShow: 1,
       //     slidesToScroll: 1,
       //     dots: true,
       //     speed: 100
       //   });
       // }
     }
