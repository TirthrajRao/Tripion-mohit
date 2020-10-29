import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../services/trip.service';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-premium-account-payment',
  templateUrl: './premium-account-payment.component.html',
  styleUrls: ['./premium-account-payment.component.scss'],
})
export class PremiumAccountPaymentComponent implements OnInit {
  amount: any;
  type: any;
  submitted: Boolean = false;
  currentUser = JSON.parse(localStorage.getItem('currentUser'))
  selectedFormCategory = JSON.parse(localStorage.getItem('selectedFormCategory'));
  isDisable: Boolean = false;
  loading: Boolean = false;
  noOfPlan: any;
  destinationFormData: any;
  destinationId: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _tripService: TripService,
    public appComponent: AppComponent,
    ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.amount = this.router.getCurrentNavigation().extras.state.amount;
        this.type = this.router.getCurrentNavigation().extras.state.type;
        this.noOfPlan = this.router.getCurrentNavigation().extras.state.noOfPlan;
        this.destinationFormData = this.router.getCurrentNavigation().extras.state.formData;


        console.log("this.destinationFormData is the -=========>", this.destinationFormData);
        this.destinationId = this.router.getCurrentNavigation().extras.state.destinationId;
        this.destinationFormData = JSON.parse(localStorage.getItem('form_data'))
        console.log("in payment page", this.amount, this.type, this.destinationFormData)
        localStorage.setItem('form_data', JSON.stringify(this.destinationFormData))
      }
    });
  }

  ngOnInit() { }


  payNow() {
    console.log("pay now");

    let obj;
    if (JSON.parse(localStorage.getItem('form_data')).length) {
      obj = {
        id: this.currentUser.id,
        email: this.currentUser.email,
        form_category: this.selectedFormCategory.toString(),
        form_data: localStorage.getItem('form_data')
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
        this.appComponent.sucessAlert("Transection successful!!", "WoW")
        this.router.navigate(['/home']);
      }, (err) => {
        this.appComponent.errorAlert(err.error.message);
        this.isDisable = false;
        this.loading = false;
        console.log(err);
        localStorage.removeItem('form_data');
        localStorage.removeItem('selectedFormCategory');
      })  
    } else {
      // const data = {
        // 'other-details': JSON.parse(localStorage.getItem('form_data'))
      // }
      // const array = [];
      // array.push(this.destinationFormData);

      // const formData = new FormData();
      // formData.append('id', this.currentUser.id);
      // formData.append('place_name', JSON.parse(localStorage.getItem('place_name')));
      // formData.append('form_data', localStorage.getItem('form_data'));

      // obj = {
      //   id: this.currentUser.id,
      //   destination_id: this.destinationId,
      //   form_data: localStorage.getItem('form_data')
      // }
      // console.log(obj);

      const formData = new FormData();
      formData.append('form_data', this.destinationFormData);
      formData.append('id', this.currentUser.id);
      formData.append('place_name', JSON.parse(localStorage.getItem('place_name')));

      const allData = {
        id: this.currentUser.id,
        place_name: JSON.parse(localStorage.getItem('place_name')),
        form_data: JSON.parse(localStorage.getItem('form_data'))
      }
      console.log(allData);

      this.loading = true;
      this.isDisable = true;
      this._tripService.addDestinationInquiry(formData).subscribe((res: any) => {
        console.log("res", res);
        this.loading = false;
        this.isDisable = false;
        this.appComponent.sucessAlert("Transection successful!!", "WoW")
        this.router.navigate(['/home']);
      }, (err) => {
        console.log(err);
        this.appComponent.errorAlert(err.error.message);
        this.isDisable = false;
        this.loading = false;
      })

      // this.loading = true;
      // this.isDisable = true;
      // this._tripService.addDestinationOtherFormData(obj).subscribe((res: any) => {
      //     console.log("res", res);
      //     this.loading = false;
      //     this.isDisable = false;
      //     this.appComponent.sucessAlert("Transection successful!!", "WoW")
      //     this.router.navigate(['/home']);
      //   }, (err) => {
      //       this.appComponent.errorAlert(err.error.message);
      //       this.isDisable = false;
      //       this.loading = false;
      //       console.log(err);
      //     })
        }

      }

    }
