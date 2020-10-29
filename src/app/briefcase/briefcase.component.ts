import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { AppComponent } from '../app.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare const $: any;
@Component({
  selector: 'app-briefcase',
  templateUrl: './briefcase.component.html',
  styleUrls: ['./briefcase.component.scss'],
})
export class BriefcaseComponent implements OnInit {
  curruntUser = JSON.parse(localStorage.getItem('currentUser'));
  loading: Boolean = false;
  allFolder: any = [];
  lastImage;
  imageIcon = ["assets/images/green.png", "assets/images/y1.png", "assets/images/sky.png"];
  createFolderForm: FormGroup;
  submitted: Boolean = false;
  isDisable: Boolean = false;
  constructor(
    public _uploadService: UploadService,
    public appComponent: AppComponent,
  ) {
    this.createFolderForm = new FormGroup({
      folder_name: new FormControl('', [Validators.required, Validators.pattern("^([a-zA-Z0-9][^*/><?\|:]*)$")])
    })
  }

  get f() { return this.createFolderForm.controls }

  ngOnInit() {
    this.openCreateFolderModal();
    this.getAllFolders();
  }

  /**
   * Pull to refresh
   * @param {object} event 
   */
  doRefresh(event) {
    console.log('Begin async operation');
    this.getAllFolders();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  // modal for create new folfer
  openCreateFolderModal() {
    $('#open-folder-brif').click(function () {
      $('#folder-modal-brif').fadeIn();
    });
    $('#folder-modal-brif .modal_body').click(function (event) {
      event.stopPropagation();
    });
    $('#folder-modal-brif').click(() => {
      $('#folder-modal-brif').fadeOut();
      this.createFolderForm.reset();
      this.submitted = false;
      console.log("formdata", this.createFolderForm.value)
    });
  }

  /**
   * Create Folder
   * @param {object} data
   */
  createFolder(data) {
    console.log("data", data)
    this.submitted = true;
    if (this.createFolderForm.invalid) {
      return
    }
    this.isDisable = true;
    this.loading = true;
    console.log(data);
    const obj = {
      id: this.curruntUser.id,
      folder_name: 'Other Docs/' + data.folder_name
    }
    this._uploadService.createFolder(obj).subscribe((res: any) => {
      console.log(res);
      this.isDisable = false;
      this.loading = false;
      this.createFolderForm.reset();
      this.submitted = false;
      $('#folder-modal-brif').fadeOut();
      this.getAllFolders();
    }, (err) => {
      console.log(err);
      this.appComponent.errorAlert(err.error.message);
      this.isDisable = false;
      this.loading = false;
    })
  }


  /**
   * Get All Folders Name
   */
  getAllFolders() {
    this.loading = true;
    const obj = {
      id: this.curruntUser.id
    }
    this._uploadService.getAllFolder(obj).subscribe((res: any) => {
      console.log("all folders", res);
      const remove = ["Other Docs", "Passport"]
      this.allFolder = res.data;
      this.allFolder = this.allFolder.filter(value => !remove.includes(value));
      this.loading = false;
    }, (err) => {
      console.log(err);
      this.appComponent.errorAlert(err.error.message);
      this.loading = false;
    })
  }

  /**
   * Get random folder icon
   * @param {Number} i 
   */
  getRandomImgeIcon(i) {
    var rand = Math.floor(Math.random() * this.imageIcon.length);
    rand = i % this.imageIcon.length;
    this.lastImage = rand;
    return this.imageIcon[rand];
  }

}
