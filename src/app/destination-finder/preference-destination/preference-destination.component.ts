import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-preference-destination',
	templateUrl: './preference-destination.component.html',
	styleUrls: ['./preference-destination.component.scss'],
})
export class PreferenceDestinationComponent implements OnInit {
	preImages = [
	{
		image: "./assets/destination-images/vibe/Relaxation.jpg",
		id: 'relaxation',
		title: 'Relaxation',
		status: false
	},
	{
		image: "./assets/destination-images/climate/Arid Climate.jpg",
		id: 'aridClimate',
		title: 'Arid Climate',
		status: false
	},
	{
		image: "./assets/destination-images/vibe/Liesure & Luxury.jpg",
		id: 'liesureLuxury',
		title: 'Liesure & Luxury',
		status: false
	},
	{
		image: "./assets/destination-images/terrain/Mountain.jpg",
		id: 'mountain',
		title: 'Mountain',
		status: false
	},
	{
		image: "./assets/destination-images/vibe/Cultural Immersion.jpg",
		id: 'culturalImmersion',
		title: 'Cultural Immersion',
		status: false
	},
	{
		image: "./assets/destination-images/terrain/Valley.jpg",
		id: 'valley',
		title: 'Valley',
		status: false
	},
	{
		image: "./assets/destination-images/occasion/Family Reunion.jpg",
		id: 'familyReunion',
		title: 'Family Reunion',
		status: false
	},
	{
		image: "./assets/destination-images/occasion/honeymoon.jpg",
		id: 'honeymoon',
		title: 'Honeymoon',
		status: false
	},
	{
		image: "./assets/destination-images/vibe/Cozy & Lazy.jpg",
		id: 'cozyLazy',
		title: 'Cozy & Lazy',
		status: false
	}];


	bigPreference = [{
		image: "./assets/destination-images/vibe/Cozy & Lazy.jpg",
		id: 'cozyLazy',
		title: 'Cozy & Lazy',
		status: false
	}]



	vibe = [{
		image: "./assets/destination-images/vibe/Cozy & Lazy.jpg",
		id: 'cozyLazy',
		title: 'Cozy & Lazy',
		status: false
	},
	{
		image: "./assets/destination-images/vibe/Cultural Immersion.jpg",
		id: 'culturalImmersion',
		title: 'Cultural Immersion',
		status: false
	},
	{
		image: "./assets/destination-images/vibe/Family Friendly.jpg",
		id: 'familyFriendly',
		title: 'Family Friendly',
		status: false
	},
	{
		image: "./assets/destination-images/vibe/Historical Significance.jpg",
		id: 'historicalSignificance',
		title: 'Historical Significance',
		status: false
	},
	{
		image: "./assets/destination-images/vibe/Liesure & Luxury.jpg",
		id: 'liesureLuxury',
		title: 'Liesure & Luxury',
		status: false
	},
	{
		image: "./assets/destination-images/vibe/Nature.jpg",
		id: 'nature',
		title: 'Nature',
		status: false
	},
	{
		image: "./assets/destination-images/vibe/Nightlife.jpg",
		id: 'nightlife',
		title: 'Nightlife',
		status: false
	},
	{
		image: "./assets/destination-images/vibe/Relaxation.jpg",
		id: 'relaxation',
		title: 'Relaxation',
		status: false
	}];

	terrain = [{
		image: "./assets/destination-images/terrain/Canyon.jpg",
		id: 'canyon',
		title: 'Canyon',
		status: false
	},
	{
		image: "./assets/destination-images/terrain/Desert.jpg",
		id: 'desert',
		title: 'Desert',
		status: false
	},
	{
		image: "./assets/destination-images/terrain/Forest.jpg",
		id: 'forest',
		title: 'Forest',
		status: false
	},
	{
		image: "./assets/destination-images/terrain/Glacier.jpg",
		id: 'glacier',
		title: 'Glacier',
		status: false
	},
	{
		image: "./assets/destination-images/terrain/Mountain.jpg",
		id: 'mountain',
		title: 'Mountain',
		status: false
	},
	{
		image: "./assets/destination-images/terrain/Ocean.jpg",
		id: 'ocean',
		title: 'Ocean',
		status: false
	},
	{
		image: "./assets/destination-images/terrain/Open.jpg",
		id: 'open',
		title: 'Ocean',
		status: false
	},
	{
		image: "./assets/destination-images/terrain/River.jpg",
		id: 'river',
		title: 'River',
		status: false
	},
	{
		image: "./assets/destination-images/terrain/Valley.jpg",
		id: 'valley',
		title: 'Valley',
		status: false
	}];

	occasion = [{
		image: "./assets/destination-images/occasion/Aniversary.jpg",
		id: 'aniversary',
		title: 'Aniversary',
		status: false
	},
	{
		image: "./assets/destination-images/occasion/Annual Vacations.jpg",
		id: 'annualVacations',
		title: 'Annual Vacations',
		status: false
	},
	{
		image: "./assets/destination-images/occasion/Babymoon.jpg",
		id: 'babymoon',
		title: 'Babymoon',
		status: false
	},
	{
		image: "./assets/destination-images/occasion/Bachelor Party.jpg",
		id: 'bachelorParty',
		title: 'Bachelor Party',
		status: false
	},
	{
		image: "./assets/destination-images/occasion/Business Appraisal.jpg",
		id: 'businessAppraisal',
		title: 'Business Appraisal',
		status: false
	},
	{
		image: "./assets/destination-images/occasion/Class Reunion.jpg",
		id: 'classReunion',
		title: 'Class Reunion',
		status: false
	},
	{
		image: "./assets/destination-images/occasion/Family Reunion.jpg",
		id: 'familyReunion',
		title: 'Family Reunion',
		status: false
	},
	{
		image: "./assets/destination-images/occasion/Festival Celebration.png",
		id: 'festivalCelebration',
		title: 'Festival Celebration',
		status: false
	},
	{
		image: "./assets/destination-images/occasion/Girlfriends Getaway.jpg",
		id: 'girlfriendsGetaway',
		title: 'Girlfriends Getaway',
		status: false
	},
	{
		image: "./assets/destination-images/occasion/honeymoon.jpg",
		id: 'honeymoon',
		title: 'Honeymoon',
		status: false
	},
	{
		image: "./assets/destination-images/occasion/Incentive Celebration.jpg",
		id: 'incentiveCelebration',
		title: 'Incentive Celebration',
		status: false
	},
	{
		image: "./assets/destination-images/occasion/Mancation.jpg",
		id: 'mancation',
		title: 'Mancation',
		status: false
	},
	{
		image: "./assets/destination-images/occasion/WEDDING PROPOSAL.jpg",
		id: 'weddingProposal',
		title: 'Wedding Proposal',
		status: false
	}];

	intrests = [{
		image: "./assets/destination-images/intrests/Adventure.jpg",
		id: 'adventure',
		title: 'Adventure',
		status: false
	},
	{
		image: "./assets/destination-images/intrests/Dance & Music.jpg",
		id: 'danceMusic',
		title: 'Dance & Music',
		status: false
	},
	{
		image: "./assets/destination-images/intrests/Food & Bevrages.jpg",
		id: 'foodBevrages',
		title: 'Food & Bevrages',
		status: false
	},
	{
		image: "./assets/destination-images/intrests/History & Art.jpg",
		id: 'historyArt',
		title: 'History & Art',
		status: false
	},
	{
		image: "./assets/destination-images/intrests/Nightlife & Casino.jpg",
		id: 'nightlifeCasino',
		title: 'Nightlife & Casino',
		status: false
	},
	{
		image: "./assets/destination-images/intrests/Shopping.jpg",
		id: 'shopping',
		title: 'Shopping',
		status: false
	},
	{
		image: "./assets/destination-images/intrests/Spa & Wellness.jpg",
		id: 'spaWellness',
		title: 'Spa & Wellness',
		status: false
	},
	{
		image: "./assets/destination-images/intrests/Wildlife.jpg",
		id: 'wildlife',
		title: 'Wildlife',
		status: false
	}];

	climate = [{
		image: "./assets/destination-images/climate/Arid Climate.jpg",
		id: 'aridClimate',
		title: 'Arid Climate',
		status: false
	},
	{
		image: "./assets/destination-images/climate/Cold Tundra.jpg",
		id: 'coldTundra',
		title: 'Cold Tundra',
		status: false
	},
	{
		image: "./assets/destination-images/climate/Damp Tropical.jpg",
		id: 'dampTropical',
		title: 'Damp Tropical',
		status: false
	},
	{
		image: "./assets/destination-images/climate/Mediterranian Climate.jpg",
		id: 'mediterranianClimate',
		title: 'Mediterranian Climate',
		status: false
	},
	{
		image: "./assets/destination-images/climate/Polar Chill.jpg",
		id: 'polarChill',
		title: 'Polar Chill',
		status: false
	},
	{
		image: "./assets/destination-images/climate/Temprate Climate.jpg",
		id: 'temprateClimate',
		title: 'Temprate Climate',
		status: false
	}];










































	selectedImages = [];
	categoryId:any = [];
	isVibe:boolean = false;
	isTerrain:boolean = false;

	isOccasion:boolean = false;
	isIntrests:boolean = false;
	isClimate:boolean = false;
	userId:any;

	constructor(public router: Router, public _route: ActivatedRoute) { 
		// this.categoryId = this.router.getCurrentNavigation().extras.state;
		// console.log("the categoryId is the =====>", this.categoryId);
		
		this.categories();
	}

	ngOnInit() {}

	preferenceTitle:any;
	innerCategory:any;

	categories(){
		this.category = JSON.parse(localStorage.getItem('categoryId'));
		console.log("the category is the ====>", this.category);
		this.innerCategory = JSON.parse(localStorage.getItem('innerCategory'));
		console.log("the innerCategory is the ==>", this.innerCategory);
		this._route.params.subscribe((params) => {
			// console.log("params ==============>", params);
			this.userId = params.id
			this.preference = "Select Your " + this.userId + " Preference";
			this.preferenceTitle = "Explore The " + this.userId;
			// console.log("the user id is the =========>", this.userId);
			if (this.userId == "vibe") {
				this.isVibe = true;
				// console.log("vibe");
			}
			else if (this.userId == "occasion"){
				this.isOccasion = true;
				// console.log("occasion");
			}
			else if (this.userId == "interest") {
				this.isIntrests = true;
				// console.log("intrests");
			}
			else if(this.userId == "climate"){
				this.isClimate = true;
				// console.log("climate");
			}
			else if (this.userId == "terrain") {
				this.isTerrain = true;
				// console.log("terrain");
			}
		});
	}

	mainCategory = [];

	selectImage(value, i){      
		console.log("the value is the =====>", value);
		if(this.selectedImages.includes(value.id)){
			let index = this.selectedImages.indexOf(value.id)
			this.selectedImages.splice(index, 1);
			console.log('working id is -----------?',this.selectedImages);
			// this.vibe[i].status = false;
			// this.terrain[i].status = false;
			// this.occasion[i].status = false;
			// this.intrests[i].status = false;
			// this.climate[i].status = false;
			value.status = false;
			// localStorage.setItem('innerCategory', JSON.stringify(this.selectedImages));
		}
		else{
			this.selectedImages.push(value.id);
			console.log('working id is -----------?',this.selectedImages);
			value.status = true;
			// this.mainCategory.push(value.id);
			// this.vibe[i].status = true;
			// this.terrain[i].status = true;
			// this.occasion[i].status = true;
			// this.intrests[i].status = true;
			// this.climate[i].status = true;
		}
		// this.selectedImages = this.mainCategory;
		// console.log("the main category is the ==============>", this.mainCategory);
	}

	preference:any;
	category:any = [];
	isActive:boolean = false;
	nextForm(value, array){

		const index = this.category.indexOf(this.category[0]);
		if (index > -1) {
			this.category.splice(index, 1);
			localStorage.setItem('categoryId', JSON.stringify(this.category));
		}
		console.log("the category is the ===========>", this.category);

		if (this.category[0]) {
			this.router.navigate(['/home/preference-destination/'+ this.category[0]]);
		}
		else{
			this.router.navigate(['/home/destination-finder']);	
			console.log("condition called");
		}
	}
}
