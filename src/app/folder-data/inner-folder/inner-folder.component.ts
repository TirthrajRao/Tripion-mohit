import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { AppComponent } from '../../app.component';
declare const $: any;
@Component({
  selector: 'app-inner-folder',
  templateUrl: './inner-folder.component.html',
  styleUrls: ['./inner-folder.component.scss'],
})
export class InnerFolderComponent implements OnInit {
  folderName: any;
  files: any;
  urls: any = [];
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  message;
  loading: Boolean = false;
  allImages: any = [];
  isDisable: Boolean = false;
  constructor(
    public route: ActivatedRoute,
    public _uploadService: UploadService,
    public appComponent: AppComponent,
  ) {
    this.route.params.subscribe((params) => {
      this.folderName = params.foldername;
    });
  }


  ngOnInit() {
    console.log("folder name", this.folderName)
    this.getAllImages();
  }

  openModal() {
    $('#Add-Pictures').fadeIn();
    $('#Add-Pictures .modal_body').click(function (event) {
      event.stopPropagation();
    });
    $('#Add-Pictures').click(() => {
      $('#Add-Pictures').fadeOut();
    });
  }

  /**
   * Select file from device
   * @param {object} e 
   */
  selectFile(e) {
    console.log("===", e.target.files);

    this.files = e.target.files
    for (let i = 0; i < this.files.length; i++) {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        const obj = {
          url: e.target.result,
          imageName: this.files[i].name,
        }
        if (this.files[i].type == 'image/png' || this.files[i].type == 'image/jpeg' || this.files[i].type == 'image/jpg') {
          obj['type'] = 'image'
        } else {
          let type = this.files[i].name.split('.');
          obj['type'] = type[type.length - 1]
          console.log("type", type);
        }
        this.urls.push(obj);
      }
      reader.readAsDataURL(this.files[i]);
    }
    this.message = ''
    console.log(this.urls)
  }

  /**
   * Upload Document to briefcase
   */
  uploadImage() {
    console.log("=====================", this.files)
    if (!this.files) {
      this.message = 'Please select Images'
      return
    }
    this.isDisable = true;
    this.loading = true;
    let data = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      data.append('profile_image[]', this.files[i])
    }
    data.append('id', this.currentUser.id);
    data.append('folder_name', 'Other Docs/' + this.folderName);
    data.append('image_type', 'other')
    this._uploadService.uploadDocuments(data).subscribe((res: any) => {
      console.log("res", res);
      $('#Add-Pictures').fadeOut();
      this.files = "";
      this.getAllImages();
      this.isDisable = false;
      this.loading = false;
      this.urls = [];
    }, (err) => {
      console.log(err);
      this.isDisable = false;
      this.loading = false;
      this.appComponent.errorAlert(err.error.message);
    })
  }


  /**
  * Get Folder Images
  */
  getAllImages() {
    this.loading = true;
    const obj = {
      id: this.currentUser.id,
      folder_name: 'Other Docs/' + this.folderName
    }
    this._uploadService.getFolderData(obj).subscribe((res: any) => {
      console.log("all image in folder", res);
      this.allImages = res.data;
      this.loading = false;
    }, (err) => {
      console.log(err);
      this.appComponent.errorAlert(err.error.message);
      this.loading = false;
    })
  }

  /**
   * set fallback image on error
   * @param {Number} index 
   */
  onErrorImage(index) {
    console.log("index", index);
    this.allImages[index].image_url = 'assets/images/placeholder.png'
  }
}
