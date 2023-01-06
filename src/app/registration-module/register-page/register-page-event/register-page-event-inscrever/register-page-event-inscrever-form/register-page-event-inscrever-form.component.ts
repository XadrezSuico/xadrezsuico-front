import { EventPublicClub } from './../../../../_interfaces/event-public-club';
import { RegisterEventClubController } from './../../../../_controllers/register-event-club.controller';
import { EventPublicCity } from './../../../../_interfaces/event-public-city';
import { EventPublicCountry } from './../../../../_interfaces/event-public-country';
import { RegisterEventCountryController } from './../../../../_controllers/register-event-country.controller';
import { EventPublicPlayer } from './../../../../_interfaces/event-public-player';
import { EventPublic } from './../../../../_interfaces/event-public';
import { Component, Input, OnInit } from '@angular/core';
import { EventPublicCategory } from 'src/app/registration-module/_interfaces/event-public-category';
import { Select2Option, Select2SearchEvent, Select2UpdateEvent } from 'ng-select2-component';
import { RegisterEventStateController } from 'src/app/registration-module/_controllers/register-event-state.controller';
import { EventPublicState } from 'src/app/registration-module/_interfaces/event-public-state';
import { RegisterEventCityController } from 'src/app/registration-module/_controllers/register-event-city.controller';

@Component({
  selector: 'app-register-page-event-inscrever-form',
  templateUrl: './register-page-event-inscrever-form.component.html',
  styleUrls: ['./register-page-event-inscrever-form.component.scss']
})
export class RegisterPageEventInscreverFormComponent implements OnInit {

  form_started = false;
  constructor(
    private register_event_country_controller:RegisterEventCountryController,
    private register_event_state_controller:RegisterEventStateController,
    private register_event_city_controller:RegisterEventCityController,
    private register_event_club_controller:RegisterEventClubController
    ) { }
  @Input()
  event!:EventPublic;

  @Input()
  player!:EventPublicPlayer;

  @Input()
  categories!:Array<EventPublicCategory>;

  category_id!:number;
  categories_list:Array<Select2Option> = [];

  countries:Array<Select2Option> = [];
  states:Array<Select2Option> = [];
  cities:Array<Select2Option> = [];
  clubs:Array<Select2Option> = [];

  country_id!:number;
  state_id!:number;
  city_id!:number;

  club_id!:number;

  ngOnInit(): void {
    this.setCityFromPlayer();

    this.setClubFromPlayer();

    this.parseCategoriesToSelect2();
  }

  async setCityFromPlayer(){
    if(this.player.city.state){
      if(this.player.city.state.country){
        await this.listCountries(()=>{ console.log(this.countries.length) });

        this.country_id = this.player.city.state.country.id;

        await this.listStates();

        this.state_id = this.player.city.state.id;

        await this.listCities();

        this.city_id = this.player.city.id;
      }
    }

    this.form_started = true;
  }

  async setClubFromPlayer(){
    if(this.player.club){
      await this.addClubToSelect2(this.player.club.id);

      this.club_id = this.player.club.id;
    }
  }

  async parseCategoriesToSelect2(callback:any = null){
    this.categories_list = [];
    for(let category of this.categories){
      let item:Select2Option = {
        value: "",
        label: "",
      };
      item.value = category.id;
      item.label = category.name;

      this.categories_list[this.categories_list.length] = item;
    }

    if(callback){
      callback();
    }
  }

  async listCountries(callback:any = null){
    let response = await this.register_event_country_controller.list();
    if(response.ok){
      await this.parseCountriesToSelect2(response.countries);

      if(callback){
        callback();
      }
    }
  }

  async parseCountriesToSelect2(countries:Array<EventPublicCountry>, callback:any = null){
    this.countries = [];
    for(let country of countries){
      let item:Select2Option = {
        value: "",
        label: "",
      };
      item.value = country.id;
      item.label = country.name;

      this.countries[this.countries.length] = item;
    }

    if(callback){
      callback();
    }
  }

  async listStates(callback:any = null){
    let response = await this.register_event_state_controller.list(this.country_id);
    if(response.ok){
      await this.parseStatesToSelect2(response.states);

      if(callback){
        callback();
      }
    }
  }

  async parseStatesToSelect2(states:Array<EventPublicState>, callback:any = null){
    this.states = [];
    for(let state of states){
      let item:Select2Option = {
        value: "",
        label: "",
      };
      item.value = state.id;
      item.label = state.name.concat(" (").concat(state.slug).concat(")");

      this.states[this.states.length] = item;
    }

    if(callback){
      callback();
    }
  }


  async listCities(callback:any = null){
    let response = await this.register_event_city_controller.list(this.state_id);
    if(response.ok){
      await this.parseCitiesToSelect2(response.cities);

      if(callback){
        callback();
      }
    }
  }

  async parseCitiesToSelect2(cities:Array<EventPublicCity>, callback:any = null){
    this.cities = [];
    for(let city of cities){
      let item:Select2Option = {
        value: "",
        label: "",
      };
      item.value = city.id;
      item.label = city.name;

      this.cities[this.cities.length] = item;
    }

    if(callback){
      callback();
    }
  }

  search_count = 0;
  async searchClubs(e:Select2SearchEvent){
    this.search_count++;
    let search_this_count = this.search_count;

    setTimeout(async ()=>{
      if(this.search_count === search_this_count){
        console.log("search")
        let response = await this.register_event_club_controller.search(e.search);
        if(response.ok){
          await this.parseClubsToSelect2(response.clubs);
        }
      }
    },400);
  }

  async addClubToSelect2(club_id:number){
    let response = await this.register_event_club_controller.get(club_id);

    if(response.ok){
      let item:Select2Option = {
        value: "",
        label: "",
      };
      item.value = response.club.id;
      item.label = response.club.name;

      this.clubs[this.clubs.length] = item;
    }

  }

  async parseClubsToSelect2(clubs:Array<EventPublicClub>, callback:any = null){
    this.clubs = [];
    for(let club of clubs){
      let item:Select2Option = {
        value: "",
        label: "",
      };
      item.value = club.id;
      item.label = club.name;

      this.clubs[this.clubs.length] = item;
    }

    if(callback){
      callback();
    }
  }

  onSubmit(){

  }

  updateCountry(e:any){
    this.country_id = e.value;

    if(this.form_started) this.listStates();

    this.state_id = 0;
    this.city_id = 0;
  }
  updateState(e:any){
    this.state_id = e.value;

    if(this.form_started) this.listCities();

    this.city_id = 0;
  }
  updateCity(e:any){
    this.city_id = e.value;
  }
  updateCategory(e:any){
    this.category_id = e.value;
  }
  updateClub(e:any){
    this.club_id = e.value;
  }

}
