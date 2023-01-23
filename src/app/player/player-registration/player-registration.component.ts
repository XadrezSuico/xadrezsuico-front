import { PlayerClubController } from './../_controllers/club.controller';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { PlayerDocumentType } from './../_interfaces/player-document-type';
import { PlayerDocumentTypeController } from './../_controllers/document-type.controller';
import { PlayerCity } from './../_interfaces/player-city';
import { PlayerState } from './../_interfaces/player-state';
import { PlayerCountryController } from './../_controllers/country.controller';
import { PlayerStateController } from './../_controllers/state.controller';
import { PlayerCityController } from './../_controllers/city.controller';
import { Select2Option, Select2SearchEvent, Select2UpdateValue } from 'ng-select2-component';
import { PlayerSexController } from './../_controllers/sex.controller';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { PlayerSex } from '../_interfaces/player-sex';
import { PlayerCountry } from '../_interfaces/player-country';
import Swal from 'sweetalert2';
import { PlayerClub } from '../_interfaces/player-club';

@Component({
  templateUrl: './player-registration.component.html',
  styleUrls: ['./player-registration.component.scss']
})
export class PlayerRegistrationComponent implements OnInit, OnChanges {

  faSpin = faSyncAlt;

  constructor(
    private player_sex_controller:PlayerSexController,

    private player_city_controller:PlayerCityController,
    private player_state_controller:PlayerStateController,
    private player_country_controller:PlayerCountryController,

    private player_document_type_controller:PlayerDocumentTypeController,

    private player_club_controller:PlayerClubController,
  ) {
  }
  is_requesting = true;

  active = 1;

  step = 0;
  /*
   *
   * 0 - STEP 1
   * 1 - STEP 2
   * 2 - STEP 3
   * 3 - STEP 4
   * 4 - STEP 5
   * 5 - SENDING
   * 6 - SENT AND OK
   *
   */

  tab_names = {
    1:"Dados Básicos",
    2:"Documentos",
    3:"Outras Informações",
    4:"Cadastros nas Entidades e Plataformas Online",
    5:"Vínculo do Enxadrista"
  }

  field_values:any = [];

  accepts = {
    policy:0
  }

  ngOnInit(): void {
    this.listSexes(()=>{
      this.listCountries(()=>{
        this.is_requesting = false;

        this.form_started = true;
      });
    });

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    alert(1)
  }

  onNavChange(event:any){
    console.log(this.active);
  }

  setStep(number:number){
    this.step = number;
  }

  goToPage2(){
    for(let field of ["name","birthday","sex_id","born_country_id"]){
      if(!this.field_values[field] || this.field_values[field] == ""){
        switch(field){
          case "name":
            Swal.fire({
                title: 'Erro!',
                text: 'O campo "Nome" é obrigatório!',
                icon: 'error',
                confirmButtonText: 'Fechar',
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
            return ;
          case "birthday":
            Swal.fire({
                title: 'Erro!',
                text: 'O campo "Data de Nascimento" é obrigatório!',
                icon: 'error',
                confirmButtonText: 'Fechar',
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
            return ;
          case "sex_id":
            Swal.fire({
                title: 'Erro!',
                text: 'O campo "Sexo" é obrigatório!',
                icon: 'error',
                confirmButtonText: 'Fechar',
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
            return ;
          case "born_country_id":
            Swal.fire({
                title: 'Erro!',
                text: 'O campo "País de Nascimento" é obrigatório!',
                icon: 'error',
                confirmButtonText: 'Fechar',
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
            return ;
        }
      }
    }

    this.is_requesting = true;
    this.listDocumentTypes(()=>{
      this.active = 2;

      this.setStep(this.active-1);


      this.is_requesting = false;
    });
  }
  goToPage3(){
    let is_document_found = false;
    for(let document_type of this.document_types){
      if(document_type.is_required){
        if(!this.field_values['documents'][document_type.id] || this.field_values['documents'][document_type.id] === ""){
          Swal.fire({
              title: 'Erro!',
              text: 'O documento "'.concat(document_type.name).concat('" é obrigatório!'),
              icon: 'error',
              confirmButtonText: 'Fechar',
              toast: true,
              position: 'top-right',
              timer: 3000,
              timerProgressBar: true,
          });

          return;
        }
      }else{
        if(!(!this.field_values['documents'][document_type.id] || this.field_values['documents'][document_type.id] === "")){
          is_document_found = true;
        }
      }
    }

    if(!is_document_found){
      Swal.fire({
        title: 'Erro!',
        text: 'É obrigatório informar ao menos 1 (UM) documento dos listados.',
        icon: 'error',
        confirmButtonText: 'Fechar',
        toast: true,
        position: 'top-right',
        timer: 3000,
        timerProgressBar: true,
      });

      return;
    }


    this.active = 3;

    this.setStep(this.active-1);
  }
  goToPage4(){
    for(let field of ["email","cellphone_country_id","cellphone"]){
      if(!this.field_values[field] || this.field_values[field] == ""){
        switch(field){
          case "email":
            Swal.fire({
                title: 'Erro!',
                text: 'O campo "E-mail" é obrigatório!',
                icon: 'error',
                confirmButtonText: 'Fechar',
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
            return ;
          case "cellphone_country_id":
            Swal.fire({
                title: 'Erro!',
                text: 'O campo "País do Celular" é obrigatório!',
                icon: 'error',
                confirmButtonText: 'Fechar',
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
            return ;
          case "cellphone":
            Swal.fire({
                title: 'Erro!',
                text: 'O campo "Celular" é obrigatório!',
                icon: 'error',
                confirmButtonText: 'Fechar',
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
            return ;
          case "born_country_id":
            Swal.fire({
                title: 'Erro!',
                text: 'O campo "País de Nascimento" é obrigatório!',
                icon: 'error',
                confirmButtonText: 'Fechar',
                toast: true,
                position: 'top-right',
                timer: 3000,
                timerProgressBar: true,
            });
            return ;
        }
      }
    }

    this.active = 4;

    this.setStep(this.active-1);
  }
  goToPage5(){
    this.active = 5;

    this.setStep(this.active-1);
  }

  backToPage1(){
    this.active = 1;

    this.setStep(this.active-1);
  }
  backToPage2(){
    this.active = 2;

    this.setStep(this.active-1);
  }
  backToPage3(){
    this.active = 3;

    this.setStep(this.active-1);
  }
  backToPage4(){
    this.active = 4;

    this.setStep(this.active-1);
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

  form_started = false;

  sex_id:number = 0;
  sexes:Array<Select2Option> = []
  async listSexes(callback:any = null){
    let response = await this.player_sex_controller.list();
    if(response.ok){
      await this.parseSexesToSelect2(response.sexes);

      if(callback){
        callback();
      }
    }
  }

  async parseSexesToSelect2(sexes:Array<PlayerSex>, callback:any = null){
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
  async updateSex(e:any){
    this.sex_id = e.value;
    await this.setField("sex_id",e.value);
  }


  born_country_id:number = 0;
  cellphone_country_id:number = 0;
  country_id:number = 0;

  state_id:number = 0;

  city_id:number = 0;

  countries:Array<Select2Option> = [];
  states:Array<Select2Option> = [];
  cities:Array<Select2Option> = [];

  document_types:Array<PlayerDocumentType> = [];

  async listCountries(callback:any = null){
    let response = await this.player_country_controller.list();
    if(response.ok){
      await this.parseCountriesToSelect2(response.countries);

      if(callback){
        callback();
      }
    }
  }

  async parseCountriesToSelect2(countries:Array<PlayerCountry>, callback:any = null){
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
    let response = await this.player_state_controller.list(this.country_id);
    if(response.ok){
      await this.parseStatesToSelect2(response.states);

      if(callback){
        callback();
      }
    }
  }

  async parseStatesToSelect2(states:Array<PlayerState>, callback:any = null){
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
    let response = await this.player_city_controller.list(this.state_id);
    if(response.ok){
      await this.parseCitiesToSelect2(response.cities);

      if(callback){
        callback();
      }
    }
  }

  async parseCitiesToSelect2(cities:Array<PlayerCity>, callback:any = null){
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


  async listDocumentTypes(callback:any = null){
    let response = await this.player_document_type_controller.list(this.born_country_id);
    if(response.ok){
      this.clearDocuments();

      this.document_types = response.document_types;

      console.log(this.document_types);

      if(callback){
        callback();
      }
    }
  }

  club_id:number = 0;
  clubs:Array<Select2Option> = [];
  search_count = 0;

  async searchClubs(e:Select2SearchEvent){
    this.search_count++;
    let search_this_count = this.search_count;

    setTimeout(async ()=>{
      if(this.search_count === search_this_count){
        console.log("search")
        let response = await this.player_club_controller.search(e.search);
        if(response.ok){
          await this.parseClubsToSelect2(response.clubs);
        }
      }
    },400);
  }

  async addClubToSelect2(club_id:number){
    let response = await this.player_club_controller.get(club_id);

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

  async parseClubsToSelect2(clubs:Array<PlayerClub>, callback:any = null){
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


  async updateBornCountry(e:any){
    this.born_country_id = e.value;
    await this.setField("born_country_id",e.value);

    this.clearDocuments();
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
  updateClub(e:any){
    this.club_id = e.value;
  }


  updateAcceptPolicy(e:any){
    if(this.accepts.policy){
      this.accepts.policy = 0;
    }else{
      this.accepts.policy = 1;
    }
  }

}
