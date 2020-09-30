import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { AppComponent } from '../../app.component';
import { NavController, Slides } from 'ionic-angular';
import { IonSlides} from '@ionic/angular';
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
  placeTitle:any;
  days:any;
  night:any;
  isArraw:boolean = false;

  @ViewChild('mySlider', {static: false})  slides: IonSlides;

  constructor(
    public route: ActivatedRoute,
    public _tripService: TripService,
    public appComponent: AppComponent,
    public _router: Router
    ) {
    this.route.params.subscribe((param) => {
      this.destinationId = param.id
    });    
          $(document).ready(function(){
        $(".next").css("color", "#f3b84d");
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
      this.placeTitle = res.data.name;
      this.days = res.data.days;
      this.night = res.data.nights;
      localStorage.setItem('place_name', JSON.stringify(res.data.name));
      this.loading = false;

      console.log("the res of the data correct is ---------->", res);
    }, (err) => {
      this.loading = false;
      console.log("the err of the data correct is ---------->", err);
    })
  }

  slidePrev() {
    
    this.isArraw = true;
    if (this.slides.slidePrev()) {
      $(document).ready(function(){
        $(".prev").css("color", "#f3b84d");
      });
      $(document).ready(function(){
        $(".next").css("color", "black");
      });  
    }
  }
  
  slideNext() {
    
    if (this.slides.slideNext()) {
      $(document).ready(function(){
        $(".next").css("color", "#f3b84d");
        console.log("the called");
      });
      $(document).ready(function(){
        $(".prev").css("color", "black");
      });
    }
  }

  sendUsInquiry(){
    var id = this.curruntUser.id;
    this._router.navigate(['/home/destination-other-detail/' + id]);
    localStorage.setItem('form_data', JSON.stringify(this.Destinationdetails[0].name))
  }
}
