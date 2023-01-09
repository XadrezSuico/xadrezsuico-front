import { RegisterEventPlayerController } from './../../../../_controllers/register-event-player.controller';
import { EventPublicDocumentType } from './../../../../_interfaces/event-public-document-type';
import { RegisterEventDocumentTypeController } from './../../../../_controllers/register-event-document-type.controller';
import { EventPublicSex } from './../../../../_interfaces/event-public-sex';
import { RegisterEventSexController } from './../../../../_controllers/register-event-sex.controller';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Select2Option } from 'ng-select2-component';
import { RegisterEventCityController } from 'src/app/registration-module/_controllers/register-event-city.controller';
import { RegisterEventCountryController } from 'src/app/registration-module/_controllers/register-event-country.controller';
import { RegisterEventStateController } from 'src/app/registration-module/_controllers/register-event-state.controller';
import { RegisterEventController } from 'src/app/registration-module/_controllers/register-event.controller';
import { EventPublic } from 'src/app/registration-module/_interfaces/event-public';
import { EventPublicCity } from 'src/app/registration-module/_interfaces/event-public-city';
import { EventPublicCountry } from 'src/app/registration-module/_interfaces/event-public-country';
import { EventPublicPlayer } from 'src/app/registration-module/_interfaces/event-public-player';
import { EventPublicState } from 'src/app/registration-module/_interfaces/event-public-state';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-page-event-update-player',
  templateUrl: './register-page-event-update-player.component.html',
  styleUrls: ['./register-page-event-update-player.component.scss']
})
export class RegisterPageEventUpdatePlayerComponent implements OnInit {

  constructor(
    private register_event_controller:RegisterEventController,
    private register_event_country_controller:RegisterEventCountryController,
    private register_event_state_controller:RegisterEventStateController,
    private register_event_city_controller:RegisterEventCityController,
    private register_event_sex_controller:RegisterEventSexController,
    private register_event_document_type_controller:RegisterEventDocumentTypeController,
    private register_event_player_controller:RegisterEventPlayerController
  ) { }

  ngOnInit(): void {
    if(this.fields.includes("city_id") || this.fields.includes("country_id") || this.fields.includes("country_cellphone_id") || this.fields.includes("documents")){
      this.listCountries();
    }
    if(this.fields.includes("sex_id")){
      this.listSexes();
    }
  }

  @Input()
  event!:EventPublic;

  @Input()
  player!:EventPublicPlayer;

  @Input()
  fields:Array<string> = [];

  @Output()
  return_to_search_event_emitter:EventEmitter<void> = new EventEmitter<void>();

  @Output()
  player_updated_event_emitter:EventEmitter<number> = new EventEmitter<number>();

  field_values:any = [];

  countries:Array<Select2Option> = [];
  states:Array<Select2Option> = [];
  cities:Array<Select2Option> = [];

  sexes:Array<Select2Option> = [];

  document_types:Array<EventPublicDocumentType> = [];

  born_country_id = 0;

  country_id = 0;
  state_id = 0;
  city_id = 0;

  sex_id = 0;

  cellphone_country_id = 0;

  form_started = false;

  async onSubmit(){
    console.log(this.field_values);

    if(this.event.uuid){
      let result = await this.register_event_player_controller.complete(this.event.uuid,this.player.id,this.field_values);
      if(result.ok){
        let timerInterval:number;
        Swal.fire({
          title: 'Atualizado!',
          html: "Cadastro atualizado. Prossiga com a inscrição do(a) enxadrista.",
          timer: 5000,
          timerProgressBar: true,
          icon: 'success',
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            if(!environment.production) console.log('I was closed by the timer')
          }
        })
        this.player_updated_event_emitter.emit(this.player.id);
      }else{
        Swal.fire({
          title: 'Erro!',
          html: result.message,
          icon: 'error',
          confirmButtonText: 'Fechar'
        });
      }
    }
  }

  returnToSearch(){
    this.return_to_search_event_emitter.emit();
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


  async listSexes(callback:any = null){
    let response = await this.register_event_sex_controller.list();
    if(response.ok){
      await this.parseSexesToSelect2(response.sexes);

      if(callback){
        callback();
      }
    }
  }

  async parseSexesToSelect2(sexes:Array<EventPublicSex>, callback:any = null){
    this.sexes = [];
    for(let sex of sexes){
      let item:Select2Option = {
        value: "",
        label: "",
      };
      item.value = sex.id;
      item.label = sex.name.concat(" (").concat(sex.slug).concat(")");

      this.sexes[this.sexes.length] = item;
    }

    if(callback){
      callback();
    }
  }


  async listDocumentTypes(callback:any = null){
    let response = await this.register_event_document_type_controller.list(this.born_country_id);
    if(response.ok){
      this.clearDocuments();

      this.document_types = response.document_types;

      console.log(this.document_types);

      if(callback){
        callback();
      }
    }
  }

  async setField(name:any,value:any){
    this.field_values[name] = value;
  }

  async setDocument(id:any,value:any){
    if(!this.field_values["documents"]){
      await this.setField("documents",[]);
    }

    let documents:any = this.field_values["documents"];

    documents[id] = value;

    await this.setField("documents",documents);
  }

  clearDocuments(){
    this.setField("documents",[]);
  }

  async updateBornCountry(e:any){
    this.born_country_id = e.value;
    await this.setField("born_country_id",e.value);

    await this.listDocumentTypes();
  }
  updateCellphoneCountry(e:any){
    this.cellphone_country_id = e.value;
    this.setField("cellphone_country_id",e.value);
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
    this.setField("city_id",e.value);
  }
  updateSex(e:any){
    this.sex_id = e.value;
    this.setField("sex_id",e.value);
  }


}
