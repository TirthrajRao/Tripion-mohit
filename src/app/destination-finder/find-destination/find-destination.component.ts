import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, Slides } from 'ionic-angular';
import { IonSlides} from '@ionic/angular';
declare const $: any;

@Component({
	selector: 'app-find-destination',
	templateUrl: './find-destination.component.html',
	styleUrls: ['./find-destination.component.scss'],
})
export class FindDestinationComponent implements OnInit {

	slideImages = [
	{
		image: "./assets/destination-images/vibe/Cozy & Lazy.jpg",
		title: "Vibe",
		id: "vibe",
		status: false
	},
	{
		image: "./assets/destination-images/intrests/Adventure.jpg",
		title: "Interest",
		id: "interest",
		status: false
	},
	{
		image: "./assets/destination-images/terrain/Canyon.jpg",
		title: "Terrain",
		id: "terrain",
		status: false
	},
	{
		image: "./assets/destination-images/occasion/Aniversary.jpg",
		title: "Occasion",
		id: "occasion",
		status: false
	},
	{
		image: "./assets/destination-images/climate/Arid Climate.jpg",
		title: "Climate",
		id: "climate",
		status: false
	}];

	mapIcons = [
	{
		image: "./assets/icon/nourth-america.png",
		title: "North america",
		id: "nourth-america",
		status: false
	},
	{
		image: "./assets/icon/south-america.png",
		title: "South america",
		id: "south-america",
		status: false
	},
	{
		image: "./assets/icon/australia.png",
		title: "Australia",
		id: "australia",
		status: false
	},
	{
		image: "./assets/icon/india.png",
		title: "India",
		id: "india",
		status: false
	},
	{
		image: "./assets/icon/europe.png",
		title: "Europe",
		id: "europe",
		status: false
	},
	{
		image: "./assets/icon/africa.png",
		title: "Africa",
		id: "africa",
		status: false
	},
	{
		image: "./assets/icon/asia.png",
		title: "Asia",
		id: "asia",
		status: false
	},
	{
		image: "./assets/icon/antartica.png",
		title: "Antartica",
		id: "antartica",
		status: false
	}];

	destinationLeft = [
	{
		title: "Short Houl",
		id: "shortHoul",
		otherid: "longHoul",
		status: true
	},
	{
		title: "Urban",
		id: "urban",
		otherid: "rural",
		status: true
	},
	{
		title: "Multi Country",
		id: "multiCountry",
		otherid: "singleCountry",
		status: true
	},
	{
		title: "Most Visited",
		id: "mostVisited",
		otherid: "offBeat",
		status: true
	}];

	destinationRight = [
	{
		title: "Long Haul",
		id: "longHoul",
		otherid: "shortHoul",
		status: false
	},
	{
		title: "Rural",
		id: "rural",
		otherid: "urban",
		status: false
	},
	{
		title: "Single Country",
		id: "singleCountry",
		otherid: "multiCountry",
		status: false
	},
	{
		title: "Off Beat",
		id: "offBeat",
		otherid: "mostVisited",
		status: false
	}];

	selectedImages = [];
	selectSliderImages = [];

	@ViewChild('mySlider', {static: false})  slides: IonSlides;
	 slideOptsTwo = {
	initialSlide: 0,
    slidesPerView: 2,
  };

	constructor(public router: Router, public _route: ActivatedRoute) { 
		this.destinationLeft.forEach((item, index) => {
			console.log("the item is the =======>", item);
			this.selectedImages.push(item.id);
		});
		$(document).ready(function(){
				$("#next").css("color", "#f3b84d");
			});
	}

	ngOnInit() {
	}

	// status: boolean = false;

	selectImage(value, i){
		// this.status = !this.status;       
		console.log("the value is the =====>", value);
		if(this.selectSliderImages.includes(value)){
			let index = this.selectSliderImages.indexOf(value)
			this.selectSliderImages.splice(index, 1);
			console.log('working id is -----------?',this.selectSliderImages);
			this.slideImages[i].status = false;
		}
		else{
			this.selectSliderImages.push(value);
			console.log('working id is -----------?',this.selectSliderImages);
			this.slideImages[i].status = true;
		}
	}

	selectMap(value, i){
		console.log("the map value is the =====>", value);
		if(this.selectedImages.includes(value)){
			let index = this.selectedImages.indexOf(value)
			this.selectedImages.splice(index, 1);
			console.log('working id is -----------?',this.selectedImages);
			this.mapIcons[i].status = false;
		}
		else{
			this.selectedImages.push(value);
			console.log('working id is -----------?',this.selectedImages);
			this.mapIcons[i].status = true;
		}	
	}

	selectTypeOfDestination(value, i){
		console.log("the map value is the =====>", value);
		if (this.destinationRight[i].status == false) {
			this.destinationLeft[i].status = false;
			this.destinationRight[i].status = true;
		}	
		else {
			this.destinationLeft[i].status = true;
			this.destinationRight[i].status = false;
		}

		if(this.selectedImages.includes(value.id)){
			let index = this.selectedImages.indexOf(value.id)
			this.selectedImages.splice(index, 1);
			console.log('working id is -----------?',this.selectedImages);
			if (!this.selectedImages.includes(value.otherid)) {
				this.selectedImages.push(value.otherid);
				console.log('working id is -----------?',this.selectedImages);
			}
		}
		else{
			this.selectedImages.push(value.id);
			console.log('working id is -----------?',this.selectedImages);
			if (this.selectedImages.includes(value.otherid)) {
				let index = this.selectedImages.indexOf(value.otherid)
				this.selectedImages.splice(index, 1);
				console.log('working id is -----------?',this.selectedImages);
			}
		}	

		
	}

	slidePrev() {
		// this.slides.slidePrev();
		if (this.slides.slidePrev()) {
			$(document).ready(function(){
				$("#prev").css("color", "#f3b84d");
			});
			$(document).ready(function(){
				$("#next").css("color", "black");
			});	
		}
		console.log("the slides is the =======>", this.slides);
	}
	
	slideNext() {
		// this.slides.slideNext();
		if (this.slides.slideNext()) {
			$(document).ready(function(){
				$("#next").css("color", "#f3b84d");
			});
			$(document).ready(function(){
				$("#prev").css("color", "black");
			});
		}
		console.log("the next slides is the =======>", this.slides);

	}

	nextForm(){
		localStorage.setItem('categoryId', JSON.stringify(this.selectSliderImages));
		if (this.selectSliderImages[0]) {
			this.router.navigate(['/home/preference-destination/' + this.selectSliderImages[0]], {state: this.selectSliderImages});
		}
	}
}
