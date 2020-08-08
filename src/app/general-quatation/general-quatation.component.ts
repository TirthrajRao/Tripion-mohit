import { Component, OnInit } from '@angular/core';
import { TripService } from '../services/trip.service';
import { ToastService } from '../services/toast.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-general-quatation',
  templateUrl: './general-quatation.component.html',
  styleUrls: ['./general-quatation.component.scss'],
})
export class GeneralQuatationComponent implements OnInit {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  quotations: any = [];
  loading: Boolean = false;
  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(
    public _tripService: TripService,
    public _toastService: ToastService,
    public photoViewer: PhotoViewer,
    private transfer: FileTransfer,
    private file: File,
    private fileOpener: FileOpener,
    public appComponent: AppComponent,
    public _router: Router
  ) { }

  ngOnInit() {

    this.getQuotations();
    // $('.quotation').on('click', 'img', (e) => {
    //   console.log("ee", e.target.attributes.src.value)
    //   const imgSrc = e.target.attributes.src.value;
    //   console.log("img src", imgSrc);
    //   var tmp = imgSrc.split('/');
    //   console.log("tmp ", tmp[tmp.length - 1].split('.')[1])
    //   const name = tmp[tmp.length - 1].match(/(.*)\.[\w]+$/)[1];
    //   const ext = tmp[tmp.length - 1].split('.')[1]
    //   console.log("image name=====>", name, ext)
    //   this.photoViewer.show(imgSrc);

    //   // this.downloadImage(imgSrc, name, 'image/' + ext, ext)
    // })
  }

  /**
 * Get Quotation
 */
  getQuotations() {
    this.loading = true;
    const obj = {
      id: this.currentUser.id 
    }
    this._tripService.getGeneralQuotation(obj).subscribe((res: any) => {
      console.log(res);
      this.loading = false;
      this.quotations = res.data;
    }, (err) => {
      console.log(err);
      this.appComponent.errorAlert(err.error.message);
      this.loading = false;
    })
  }

  /**
  * Quotation Detail
  */
  quotationDetail(id, value){
    this._router.navigate(['/home/general-quatation-detail/' + id])
  }

  /**
   * Download Image
   
  // downloadImage(url, name, mimeType, ext) {
  //   console.log("===enter====", url, name, mimeType)
  //   const ROOT_DIRECTORY = 'file:///sdcard//';
  //   const downloadFolderName = 'Download/';
  //   this.file.checkFile(ROOT_DIRECTORY + downloadFolderName, name + '.' + ext).then((isExist) => {
  //     this.openFile(ROOT_DIRECTORY + downloadFolderName + name + '.' + ext, mimeType);
  //   }).catch((notexist) => {
  //     console.log("nonexist")
  //     //create dir
  //     this.file.createDir(ROOT_DIRECTORY, downloadFolderName, true)
  //       .then((entries) => {
  //         //Download file
  //         this._toastService.presentToast("Downloading.....", 'success')
  //         this.fileTransfer.download(url, ROOT_DIRECTORY + downloadFolderName + '/' + name + '.' + ext).then((entry) => {
  //           // console.log('download complete: ' + entry.toURL());
  //           this.openFile(entry.nativeURL, mimeType);
  //         }, (error) => {
  //           console.log("error", error);
  //           this._toastService.presentToast('Error in dowloading', 'danger');
  //         })
  //       }).catch((error) => {
  //         console.log("erorr", error);
  //         this._toastService.presentToast('Error in dowloading', 'danger')
  //       });
  //   })
  // }

  /**
   * Open File
   */
  // openFile(url, mimeType) {
  //   console.log(url);
  //   this.fileOpener.showOpenWithDialog(url, mimeType)
  //     .then(() => console.log('File is opened'))
  //     .catch(e => console.log('Error opening file', e));

  // }

}
