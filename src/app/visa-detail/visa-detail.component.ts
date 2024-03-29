import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UploadService } from '../services/upload.service';
import { ToastService } from '../services/toast.service';
import * as _ from 'lodash';
import { AlertController } from '@ionic/angular';
import { data } from '../data';
import { AppComponent } from '../app.component';
declare var $: any;

@Component({
  selector: 'app-visa-detail',
  templateUrl: './visa-detail.component.html',
  styleUrls: ['./visa-detail.component.scss'],
})
export class VisaDetailComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  curruntDate: string = new Date().toISOString();
  visaDetails: any;
  editVisaForm: FormGroup;
  nextYear;
  files: any;
  urls: any = [];
  documentId: any = [];
  allImage: any = [];
  submitted: Boolean = false;
  imageId: any = [];
  visaId: any;
  selectedImages: any;
  isDisable: Boolean = false;
  loading: Boolean = true;
  counries = data.countries;
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public _uploadService: UploadService,
    public _toastService: ToastService,
    public alertController: AlertController,
    public appComponent: AppComponent,
  ) {
    this.editVisaForm = new FormGroup({
      country: new FormControl('', [Validators.required]),
      doc_expiry_date: new FormControl('', [Validators.required])
    })

    this.route.params.subscribe((param) => {
      this.visaId = param.visaId;
      console.log("visaId", this.visaId)
    })

    $(document).ready(function () {
      $('#myselection3').select2({
        // placeholder: "Select Timezone",
      });
    });

    $('#myselection3').on('select2:select', (e) => {
      console.log(e.params.data.id)
    });
  }

  ngOnInit() {

    this.getDetails(this.visaId);
    this.nextYearCount();;
    this.getSelectedImages();
  }


  ionViewWillEnter() {

  }
  get f() { return this.editVisaForm.controls }
  // Count next 12 year for expiry date of passport
  nextYearCount() {
    this.nextYear = this.curruntDate.split("-")[0];
    this.nextYear = this.nextYear++;
    this.nextYear = this.nextYear + +5;
  }

  moveDocumentPage() {
    let navigationExtras: NavigationExtras = {
      state: {
        url: 'visa-detail',
        id: this.visaId
      }
    };
    this.router.navigate(['/home/upload-document'], navigationExtras);
  }

  getSelectedImages() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.selectedImages = this.router.getCurrentNavigation().extras.state.images;
        console.log("selectedImage", this.selectedImages);
        this.visaDetails.image_url.push(...this.selectedImages)
      }
    });
  }
  closeModal() {
    this.visaDetails.image_url.push(...this.documentId);
    console.log(this.visaDetails.image_url);
    _.forEach(this.documentId, (id) => {
      $(".checkmark-icon-" + id.image_id).toggle();
      $(".image-" + id.image_id).css('opacity', '1')
    });
    this.documentId = [];
    $('#add-document-modal').fadeOut();
  }


  /**
   * Get visa details
   */
  getDetails(visaId) {
    this.loading = true;
    const obj = {
      visa_id: visaId,
      id: this.currentUser.id
    }
    this._uploadService.getSingleVisa(obj).subscribe((res: any) => {
      console.log(res);
      this.visaDetails = res.data;
      this.loading = false;

    }, (err) => {
      console.log(err);
      this.loading = false
      this.appComponent.errorAlert(err.error.message);
    })
  }

  /**
   * Edit Visa 
   * @param {object} data 
   */
  async editVisa(data) {
    this.submitted = true;
    if (this.editVisaForm.invalid) {
      return
    }
    console.log(data);
    if (this.visaDetails.image_url.length) {
      _.forEach(this.visaDetails.image_url, (image) => {
        this.imageId.push(image.image_id)
      })
    } else {
      const alert = await this.alertController.create({
        message: 'Please upload visa image',
        buttons: ['OK']
      });
      await alert.present();
      this.imageId = []
      return
    }
    if (data.doc_expiry_date.includes('T')) {
      data.doc_expiry_date = data.doc_expiry_date.split("T")[0];
    }

    this.isDisable = true;
    this.loading = true;
    data['id'] = this.currentUser.id;
    data['image_type'] = 'visa';
    data['folder_name'] = 'Passport';
    data['visa_id'] = this.visaDetails.id;
    data['attachment_id'] = this.imageId.toString();
    console.log(data, this.imageId, data.attachment_id);

    this._uploadService.editVisaDetail(data).subscribe((res: any) => {
      this.isDisable = false;
      this.loading = false;
      console.log(res);
      this.appComponent.sucessAlert("Update Successful")
      this.router.navigate(['/home/user-passport-detail'], { queryParams: { data: JSON.stringify(res.data) } })
    }, (err) => {
      this.isDisable = false
      this.loading = false;
      console.log(err);
      this.appComponent.errorAlert(err.error.message);
    })
  }

  /**
  * Remove Image in Edit Passport
  * @param {object} data 
  */
  async removeImage(data,type) {

    const alert = await this.alertController.create({
      header: 'Alert!',
      message: 'Are you sure you want to delete this '+type+'?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            let index = this.visaDetails.image_url.indexOf(data);
            console.log("index", index);
            this.visaDetails.image_url.splice(index, 1);
            console.log(this.visaDetails.image_url);
          }
        }
      ]
    });

    await alert.present();
  }

   /**
   * set fallback image on error
   * @param {Number} index 
   */
  onErrorImage(index) {
    console.log("index", index);
    this.visaDetails.image_url[index].image_url = 'assets/images/placeholder.png';
  }
}
