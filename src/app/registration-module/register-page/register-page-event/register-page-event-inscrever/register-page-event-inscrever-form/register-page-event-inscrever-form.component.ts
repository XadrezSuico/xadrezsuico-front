import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { EventPublicClub } from './../../../../_interfaces/event-public-club';
import { RegisterEventClubController } from './../../../../_controllers/register-event-club.controller';
import { EventPublicCity } from './../../../../_interfaces/event-public-city';
import { EventPublicCountry } from './../../../../_interfaces/event-public-country';
import { RegisterEventCountryController } from './../../../../_controllers/register-event-country.controller';
import { EventPublicPlayer } from './../../../../_interfaces/event-public-player';
import { EventPublic } from './../../../../_interfaces/event-public';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventPublicCategory } from 'src/app/registration-module/_interfaces/event-public-category';
import { Select2Option, Select2SearchEvent, Select2UpdateEvent } from 'ng-select2-component';
import { RegisterEventStateController } from 'src/app/registration-module/_controllers/register-event-state.controller';
import { EventPublicState } from 'src/app/registration-module/_interfaces/event-public-state';
import { RegisterEventCityController } from 'src/app/registration-module/_controllers/register-event-city.controller';
import Swal from 'sweetalert2';
import { RegisterEventController } from 'src/app/registration-module/_controllers/register-event.controller';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-page-event-inscrever-form',
  templateUrl: './register-page-event-inscrever-form.component.html',
  styleUrls: ['./register-page-event-inscrever-form.component.scss']
})
export class RegisterPageEventInscreverFormComponent implements OnInit {

  faSpin = faSyncAlt;

  form_started = false;
  constructor(
    private register_event_controller:RegisterEventController,
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

  @Output()
  player_registered_event_emitter:EventEmitter<void> = new EventEmitter<void>();

  @Output()
  return_to_search_event_emitter:EventEmitter<void> = new EventEmitter<void>();

  is_requesting:boolean = false;

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

  accepts = {
    category:0,
    regulation:0,
    policy:0,
    image:0,
  };

  async onSubmit(){
    this.is_requesting = true;
    if(this.event){
      if(this.event.uuid){
        if(!(this.category_id > 0)){
          Swal.fire({
            title: 'Erro!',
            text: "Você deve confirmar a selecionar uma categoria para se inscrever neste evento.",
            icon: 'error',
            confirmButtonText: 'Fechar'
          });
          return;
        }
        if(!this.accepts.category){
          Swal.fire({
            title: 'Erro!',
            text: "Você deve confirmar a seleção da categoria com a opção 'Categoria Confirmada' para poder se inscrever neste evento.",
            icon: 'error',
            confirmButtonText: 'Fechar'
          });
          return;
        }
        if(!this.accepts.regulation){
          Swal.fire({
            title: 'Erro!',
            text: "Você deve aceitar o regulamento do evento para poder se inscrever neste evento.",
            icon: 'error',
            confirmButtonText: 'Fechar'
          });
          return;
        }
        if(!this.accepts.policy){
          Swal.fire({
            title: 'Erro!',
            text: "Você deve aceitar os termos de uso e política de privacidade da plataforma XadrezSuíço para poder se inscrever neste evento.",
            icon: 'error',
            confirmButtonText: 'Fechar'
          });
          return;
        }
        if(!this.accepts.image){
          Swal.fire({
            title: 'Erro!',
            text: "Você deve aceitar o uso de imagem para poder se inscrever neste evento.",
            icon: 'error',
            confirmButtonText: 'Fechar'
          });
          return;
        }
        let response;
        // if(this.club_id){
          response = await this.register_event_controller.register(this.event.uuid,this.accepts,this.category_id,this.player.id,this.city_id,this.club_id);
        // }else{
        //   response = await this.register_event_controller.register(this.event.uuid,this.accepts,this.category_id,this.player.id,this.city_id);
        // }
        if(response.ok){
          let timerInterval:number;
          if(response.response){
            let html = "<strong>Sua inscrição foi recebida!</strong><hr/>";
            html = html.concat("Você receberá em no máximo 30 minutos uma mensagem no endereço de e-mail do cadastro com a confirmação do recebimento da inscrição para este evento.<hr/>");
            html = html.concat("A categoria que você se inscreveu possui pagamento, e com isso é necessário prosseguir com o pagamento clicando no botão abaixo:");
            html = html.concat("<a href='").concat(response.link).concat("' class='btn btn-success btn-lg btn-block' target='_blank'>Efetue o pagamento da sua inscrição.</a>");
            Swal.fire({
              title: 'Sucesso!',
              html: html,
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
          }else{
            let html = "<strong>Sua inscrição foi efetuada com sucesso!</strong><hr/>";
            html = html.concat("Você receberá em no máximo 30 minutos uma mensagem no endereço de e-mail do cadastro com a confirmação da inscrição para este evento.<hr/>");
            html = html.concat("Caso não receba o e-mail, confira na lista de inscritos (Acessível no topo desta página em 'Visualizar Lista de Inscrições') e verifique se lá consta o nome do(a) enxadrista em questão.");
            html = html.concat("Caso não apareça, tente novamente o processo de inscrição ou entre em contato com a organização.");
            Swal.fire({
              title: 'Sucesso!',
              html: html,
              timer: 10000,
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
          }

          this.player_registered_event_emitter.emit();
        }else{
          Swal.fire({
            title: 'Erro!',
            html: response.message,
            icon: 'error',
            confirmButtonText: 'Fechar'
          });
          return;
        }
      }
    }
    this.is_requesting = false;
  }

  ngOnInit(): void {
    this.setCityFromPlayer();

    this.setClubFromPlayer();

    this.parseCategoriesToSelect2();
  }

  async setCityFromPlayer(){
    if(this.player.city){
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

      if(category.price){
        if(category.price > 0){
          item.label = item.label.concat(" - R$ ").concat(String(category.price));
        }else{
          item.label = item.label.concat(" - Gratuito");
        }
      }else{
          item.label = item.label.concat(" - Gratuito");
      }

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

  // updateAcceptPolicy(value:number){
  //   this.accepts.policy = value;
  // }
  updateAcceptCategory(e:any){
    if(this.accepts.category){
      this.accepts.category = 0;
    }else{
      this.accepts.category = 1;
    }
  }
  updateAcceptRegulation(e:any){
    if(this.accepts.regulation){
      this.accepts.regulation = 0;
    }else{
      this.accepts.regulation = 1;
    }
  }
  updateAcceptPolicy(e:any){
    if(this.accepts.policy){
      this.accepts.policy = 0;
    }else{
      this.accepts.policy = 1;
    }
  }
  updateAcceptImage(e:any){
    if(this.accepts.image){
      this.accepts.image = 0;
    }else{
      this.accepts.image = 1;
    }
  }

  returnToSearch(){
    this.return_to_search_event_emitter.emit();
  }

}
