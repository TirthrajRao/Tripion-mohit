import { Component } from '@angular/core';
import { MenuController, Events } from '@ionic/angular';
import { UserService } from '../services/user.service';
import { TripService } from '../services/trip.service';
import { ToastService } from '../services/toast.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  currentUser: any;
  userName: any;
  menuPages: any;
  profilePic: any;
  currentUserData:any
  constructor(
    private menu: MenuController,
    public _userService: UserService,
    public _tripService: TripService,
    public event: Events,
    public _toastService: ToastService
  ) {
    this._userService.currentUser.subscribe(x => this.currentUser = x);
    this.getFormCategoryList();

    this.menuPages = [
      {
        title: 'Home',
        url: '/home/home-page',
        iconSrc: 'assets/images/1.png'
      },
      {
        title: 'Inquiry',
        url: '/home/service-inquiry',
        iconSrc: 'assets/images/2.png'
      },
      {
        title: 'Briefcase',
        url: '/home/briefcase',
        iconSrc: 'assets/images/3.png'
      },
      {
        title: 'Support',
        url: '/home/amendments',
        iconSrc: 'assets/images/4.png'
      },
      {
        title:'Quotation',
        url: '/home/general-quatation',
        iconSrc: 'assets/images/quote.png'
      },
      {
        title: 'Notifications',
        url: '/home/notification',
        iconSrc: 'assets/images/5.png'
      },
      {
        title: 'Past Trips',
        url: '/home/past-trips',
        iconSrc: 'assets/images/6.png'
      },
      {
        title: 'Safe to Travel',
        url: '/home/safe-travel',
        iconSrc: 'assets/images/7.png'
      },
      {
        title: 'Destination Finder',
        url: '/home/destination-finder',
        iconSrc: 'assets/images/11.png'
      },
      {
        title: 'Profile',
        url: '/home/profile',
        iconSrc: 'assets/images/9.png'
      },
    ]

  }
  ionViewWillEnter() {
    console.log("in home page enter")
    var menuHeight = $(".menu_content").innerHeight();
    var listLength = $(".menu_content").find(".menu_list").length;
    $(".menu_content .menu_list").css({ 'line-height': (menuHeight / listLength) + 'px' });
    this.currentUserData =  JSON.parse(localStorage.getItem('currentUser'));
    // console.log("curruntuser data",this.currentUserData)
    this.userName = this.currentUserData.user_name;
    this.profilePic = this.currentUserData.profile_pic
    this.event.subscribe("userName", (data) => {
      console.log(data);
      this.currentUserData = data;
    });
  }
  /**
   * Close side menu
   */
  closeMenu() {
    this.menu.close()
  }
  ngOnInit() {

  }

  /**
   * Log Out User
   */
  logOut() {
    console.log("logout")
    this._userService.logOut().subscribe((res: any) => {
      console.log("logout res", res);
      this.menu.close();
    }, err => {
      console.log(err)
    })
  }

  /**
   * Get Form Category List
   */
  getFormCategoryList() {
    this._tripService.getFormCategoryList().subscribe((res: any) => {
      localStorage.setItem('categoryList', JSON.stringify(res.data))
    }, (err) => {
      console.log(err);
    })
  }
}

