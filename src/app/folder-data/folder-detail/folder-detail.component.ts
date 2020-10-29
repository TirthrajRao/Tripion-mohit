import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UploadService } from '../../services/upload.service';
import { AppComponent } from '../../app.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-folder-detail',
  templateUrl: './folder-detail.component.html',
  styleUrls: ['./folder-detail.component.scss'],
})
export class FolderDetailComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  folderName: any;
  loading: Boolean = false;
  allDocument: any = [];
  createFolderForm: FormGroup;
  submitted: Boolean = false;
  isDisable: Boolean = false;
  constructor(
    public route: ActivatedRoute,
    public _uploadService: UploadService,
    public appComponent: AppComponent,
  ) {
    this.route.params.subscribe((params) => {
      this.folderName = params.foldername
    });
    this.createFolderForm = new FormGroup({
      folder_name: new FormControl('', [Validators.required, Validators.pattern("^([a-zA-Z0-9][^*/><?\|:]*)$")])
    })
  }

  get f() { return this.createFolderForm.controls }
  ngOnInit() {
    console.log(this.folderName);
    this.openCreateFolderModal();
    this.getFolderData();
  }
  /**
   * Pull to refresh
   * @param {object} event 
   */
  doRefresh(event) {
    console.log('Begin async operation');
    this.getFolderData();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  // modal for create new folfer
  openCreateFolderModal() {
    $('#open-folder-folder-detail').click(function () {
      $('#folder-modal-folder-detail').fadeIn();
    });
    $('#folder-modal-folder-detail .modal_body').click(function (event) {
      event.stopPropagation();
    });
    $('#folder-modal-folder-detail').click(() => {
      $('#folder-modal-folder-detail').fadeOut();
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
      id: this.currentUser.id,
      folder_name: 'Other Docs/' + data.folder_name
    }
    this._uploadService.createFolder(obj).subscribe((res: any) => {
      console.log(res);
      this.isDisable = false;
      this.loading = false;
      this.createFolderForm.reset();
      this.submitted = false;
      $('#folder-modal-folder-detail').fadeOut();
      this.getFolderData();
    }, (err) => {
      console.log(err);
      this.appComponent.errorAlert(err.error.message);
      this.isDisable = false;
      this.loading = false;
    })
  }

  /**
   * Get Folder Data
   */
  getFolderData() {
    this.loading = true;
    const obj = {
      id: this.currentUser.id,
      folder_name: this.folderName
    }

    this._uploadService.getFolderData(obj).subscribe((res: any) => {
      console.log("folder img", res);
      this.allDocument = res.data;
      this.loading = false;
    }, (err) => {
      console.log(err);
      this.appComponent.errorAlert(err.error.message);
      this.loading = false;
    })
  }

}
