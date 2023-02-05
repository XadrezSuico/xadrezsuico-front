import { PlayerRequest } from './../_interfaces/player-request';
import { PlayerRegistrationController } from './../_controllers/player-registration.controller';
import { XadrezSuicoDefault } from './../../_intefaces/default';
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
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { NgbModal, NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';
import { PlayerSex } from '../_interfaces/player-sex';
import { PlayerCountry } from '../_interfaces/player-country';
import Swal from 'sweetalert2';
import { PlayerClub } from '../_interfaces/player-club';
import { DefaultSingleton } from 'src/app/_singleton/default';
import { XadrezSuicoTitleService } from 'src/app/_services/title.service';

@Component({
  selector: 'app-player-registration',
  templateUrl: './player-registration.component.html',
  styleUrls: ['./player-registration.component.scss']
})
export class PlayerRegistrationComponent implements OnInit, OnChanges {

  faSpin = faSyncAlt;

  @Input()
  is_a_sub_component = false;

  @Output()
  player_registered_event_emitter:EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private player_sex_controller:PlayerSexController,

    private player_city_controller:PlayerCityController,
    private player_state_controller:PlayerStateController,
    private player_country_controller:PlayerCountryController,

    private player_document_type_controller:PlayerDocumentTypeController,

    private player_club_controller:PlayerClubController,

    private player_registration_controller:PlayerRegistrationController,

    private modalService: NgbModal,

    private title_service:XadrezSuicoTitleService
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
    5:"Vínculo do Enxadrista",
    6:"Cadastro Finalizado"
  }

  player:any = null;

  field_values:any = [];
  entities:any = {
    cbx:0,
    fide:0,
    lbx:0,
    lichess:0,
    chess_com:0
  };

  accepts = {
    policy:0
  }

  ngOnInit(): void {
    if(!this.is_a_sub_component) this.title_service.setTitle("Novo Cadastro de Enxadrista");

    this.listSexes(()=>{
      this.listCountries(()=>{
        this.is_requesting = false;


        setTimeout(()=>{
          this.getDefaults(()=>{
            this.form_started = true;
          });
        },300);
      });
    });

    this.doSearchClubs("");
  }

  getDefaults(callback:any = null){
    let defaults = DefaultSingleton.getInstance().getDefaults();

    this.setDefaults(defaults, callback);
  }

  setDefaults(defaults:XadrezSuicoDefault,callback:any = null){
    console.log(defaults);

    if(defaults.country_default){
      console.log("defaults: country - ".concat(String(defaults.country_default)));
      this.born_country_id = Number(defaults.country_default);
      this.cellphone_country_id = Number(defaults.country_default);
      this.country_id = Number(defaults.country_default);

      this.listStates(()=>{
        if(defaults.state_default){
          console.log(this.states);
          console.log("defaults: state");
          this.state_id = Number(defaults.state_default);
          this.listCities(()=>{
            if(defaults.city_default){
              console.log("defaults: city");
              this.city_id = Number(defaults.city_default);
            }
          });
        }
      });
    }

    setTimeout(()=>{
      if(callback){
        callback();
      }
    },300);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  onNavChange(event:any){
    console.log(this.active);
  }

  async onSubmit(){
    this.setStep(5);

    this.is_requesting = true;

    let field_values = this.field_values;
    field_values["accepts"] = this.accepts;

    let response = await this.player_registration_controller.register(field_values);
    if(response.ok === 1){
      if(response.result){

        this.player = response.player;

        this.active = 6;

        this.setStep(6);

        this.is_requesting = false;
      }else{
        this.setStep(4);

        this.is_requesting = false;

        Swal.fire({
          title: 'Erro!',
          html: response.message,
          icon: 'error',
          confirmButtonText: 'Fechar',
          toast: true,
          position: 'top-right',
          timer: 3000,
          timerProgressBar: true,
        });
      }
    }else{
      if(response.result && response.player){
        let html = response.message;

        html = html.concat("<hr/>");
        html = html.concat("Dados do Jogador:");

        html = html.concat("<h4><strong>ID:</strong> ").concat(String(response.player.id)).concat("</h4>");
        html = html.concat("<strong>Nome:</strong> ").concat(response.player.name).concat("<br/>");
        html = html.concat("<strong>Data de Nascimento:</strong> ").concat(response.player.birthday).concat("<br/>");
        html = html.concat("<strong>Cidade:</strong> ").concat(response.player.city_name).concat("<br/>");

        Swal.fire({
          title: 'Jogador Existente!',
          html: html,
          showCancelButton: true,
          confirmButtonText: (this.is_a_sub_component) ? "OK, Usar este cadastro" : "OK",
          cancelButtonText: `Cancelar`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.player_registered_event_emitter.emit(response?.player?.id);
          } else if (result.isDenied) {

          }
        })
      }else{
        this.setStep(4);

        this.is_requesting = false;

        Swal.fire({
          title: 'Erro!',
          html: response.message,
          icon: 'error',
          confirmButtonText: 'Fechar',
          toast: true,
          position: 'top-right',
          timer: 3000,
          timerProgressBar: true,
        });
      }
    }
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

    this.checkIfPlayerExists(this.field_values["name"],this.field_values["birthday"],[],()=>{
      if(this.is_born_country_changed || this.document_types.length === 0){
        this.is_requesting = true;
        this.listDocumentTypes(()=>{
          this.active = 2;

          this.setStep(this.active-1);


          this.is_requesting = false;
        });

        this.is_born_country_changed = false;
      }else{
          this.active = 2;
          this.setStep(this.active-1);
      }
    });

  }
  goToPage3(){
    console.log(this.field_values);

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
        }else{
          is_document_found = true;
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

    this.checkIfPlayerExists(null,null,this.field_values["documents"],()=>{
      this.active = 3;

      this.setStep(this.active-1);
    });
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

    this.previne_country_update = true;
    this.previne_state_update = true;

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

  async checkIfPlayerExists(name = null, birthday = null, documents = [], callback_ok:any = null, callback_error:any = null){
    this.is_requesting = true;
    let response:PlayerRequest;
    if(name && birthday){
      response = await this.player_registration_controller.check(name,birthday);

      if(response.result && response.message && response.player){
        let html = response.message;

        html = html.concat("<hr/>");
        html = html.concat("Dados do Jogador:");

        html = html.concat("<h4><strong>ID:</strong> ").concat(String(response.player.id)).concat("</h4>");
        html = html.concat("<strong>Nome:</strong> ").concat(response.player.name).concat("<br/>");
        html = html.concat("<strong>Data de Nascimento:</strong> ").concat(response.player.birthday).concat("<br/>");
        html = html.concat("<strong>Cidade:</strong> ").concat(response.player.city_name).concat("<br/>");

        Swal.fire({
          title: 'Jogador Existente!',
          html: html,
          showCancelButton: true,
          confirmButtonText: (this.is_a_sub_component) ? "OK, Usar este cadastro" : "OK",
          cancelButtonText: `Cancelar`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.player_registered_event_emitter.emit(response?.player?.id);
          } else if (result.isDenied) {

          }
        })

        if(callback_error){
          callback_error();
        }
      }else{
        if(callback_ok){
          callback_ok();
        }
      }
    }else if(documents.length > 0){
      response = await this.player_registration_controller.check("","",documents);

      if(response.result && response.message && response.player){
        let html = response.message;

        html = html.concat("<hr/>");
        html = html.concat("Dados do Jogador:");

        html = html.concat("<h4><strong>ID:</strong> ").concat(String(response.player.id)).concat("</h4>");
        html = html.concat("<strong>Nome:</strong> ").concat(response.player.name).concat("<br/>");
        html = html.concat("<strong>Data de Nascimento:</strong> ").concat(response.player.birthday).concat("<br/>");
        html = html.concat("<strong>Cidade:</strong> ").concat(response.player.city_name).concat("<br/>");

        Swal.fire({
          title: 'Jogador Existente!',
          html: html,
          showCancelButton: true,
          confirmButtonText: (this.is_a_sub_component) ? "OK, Usar este cadastro" : "OK",
          cancelButtonText: `Cancelar`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.player_registered_event_emitter.emit(response?.player?.id);
          } else if (result.isDenied) {

          }
        })

        if(callback_error){
          callback_error();
        }
      }else{
        if(callback_ok){
          callback_ok();
        }
      }
    }else{

      if(callback_error){
        callback_error();
      }
    }


    this.is_requesting = false;
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
  document_types_selected:Array<PlayerDocumentType> = [];

  previne_country_update = false;
  previne_state_update = false;

  async listCountries(callback:any = null){
    let response = await this.player_country_controller.list();
    if(response.ok){
      await this.parseCountriesToSelect2(response.countries);

      if(callback){
        setTimeout(()=>{
          callback();
        },200);
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

      this.document_types_selected = [];

      this.document_types = response.document_types;

      console.log(this.document_types);

      for(let document_type of this.document_types){
        if(document_type.is_required){
          this.addSelectedDocumentType(document_type);
        }
      }

      if(callback){
        callback();
      }
    }
  }

  async addSelectedDocumentType(document_type:PlayerDocumentType){
    if(!this.document_types_selected.includes(document_type)){
      this.document_types_selected[this.document_types_selected.length] = document_type;
    }
  }
  async removeSelectedDocumentType(document_type:PlayerDocumentType){
    if(this.document_types_selected.includes(document_type)){
      this.document_types_selected.splice(this.document_types_selected.indexOf(document_type,0),1);
      if(this.field_values['documents'][document_type.id]){
        this.field_values['documents'].splice(document_type.id,1);
      }

      console.log(this.field_values);
    }
  }

  club_id:number = 0;
  clubs:Array<Select2Option> = [];
  search_count = 0;

  async searchClubs(e:Select2SearchEvent){
    this.search_count++;
    let search_this_count = this.search_count;

    setTimeout(async ()=>{
      await this.doSearchClubs(e.search);
    },400);
  }
  async doSearchClubs(search:string){
    console.log("search")
    let response = await this.player_club_controller.search(search);
    if(response.ok){
      await this.parseClubsToSelect2(response.clubs);
    }
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

  is_born_country_changed = false;
  async updateBornCountry(e:any){
    if(this.born_country_id !== e.value){
      this.is_born_country_changed = true;
    }

    this.born_country_id = e.value;
    await this.setField("born_country_id",e.value);

    if(this.is_born_country_changed) this.clearDocuments();
  }
  updateCellphoneCountry(e:any){
    this.cellphone_country_id = e.value;
    this.setField("cellphone_country_id",e.value);
  }
  updateCountry(e:any){
    console.log("updateCountry")
    this.country_id = e.value;

    if(this.form_started){
      this.listStates();

      if(!this.previne_country_update){
        this.state_id = 0;
        this.city_id = 0;
      }else{
        this.previne_country_update = false;
      }
    }
  }
  updateState(e:any){
    this.state_id = e.value;

    if(this.form_started){
      this.listCities();

      if(!this.previne_state_update){
        this.city_id = 0;
      }else{
        this.previne_state_update = false;
      }
    }
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

  selectPlayer(player:any){
    this.player_registered_event_emitter.emit(player.id);
  }

  modal_club_ref:any = null;
  openNewClubModal(content:any){
		this.modal_club_ref = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });

    return false;
  }

  async onClubSelected(club_id:number){
    this.modal_club_ref.close();

    let response = await this.player_club_controller.get(club_id);
    if(response.ok === 1){
      this.parseClubsToSelect2([response.club],()=>{
        this.club_id = response.club.id;
      });
    }
  }
  modal_city_ref:any = null;
  openNewCityModal(content:any){
		this.modal_city_ref = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });

    return false;
  }

  async onCitySelected(city_id:number){
    this.modal_city_ref.close();

    let response = await this.player_city_controller.get(city_id);
    if(response.ok === 1){
      this.parseCitiesToSelect2([response.city],()=>{
        this.city_id = response.city.id;
      });
    }
  }

  modal_state_ref:any = null;
  openNewStateModal(content:any){
		this.modal_state_ref = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' });

    return false;
  }

  async onStateSelected(state_id:number){
    this.modal_state_ref.close();

    let response = await this.player_state_controller.get(state_id);
    if(response.ok === 1){
      this.parseStatesToSelect2([response.state],()=>{
        this.state_id = response.state.id;
      });
    }
  }



}
