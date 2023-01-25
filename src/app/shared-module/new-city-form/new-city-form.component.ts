import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { Select2Option } from 'ng-select2-component';
import { CityController } from 'src/app/_controllers/city.controller';
import { CountryController } from 'src/app/_controllers/country.controller';
import { StateController } from 'src/app/_controllers/state.controller';
import { Country } from 'src/app/_intefaces/country';
import { XadrezSuicoDefault } from 'src/app/_intefaces/default';
import { State } from 'src/app/_intefaces/player-state';
import { DefaultSingleton } from 'src/app/_singleton/default';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-city-form',
  templateUrl: './new-city-form.component.html',
  styleUrls: ['./new-city-form.component.scss']
})
export class NewCityFormComponent implements OnInit {


  default_singleton:DefaultSingleton;

  is_requesting = true;

  faSpin = faSyncAlt;

  @Input()
  is_a_sub_component = false;

  @Input()
  input_country_id = 0;

  @Input()
  input_state_id = 0;

  @Output()
  city_selected_event_emmiter:EventEmitter<number> = new EventEmitter<number>();


  constructor(
    private country_controller:CountryController,
    private state_controller:StateController,
    private city_controller:CityController
  ) {
    this.default_singleton = DefaultSingleton.getInstance();
  }


  async onSubmit(){
    this.is_requesting = true;
    let response = await this.city_controller.new(this.field_values);
    if(response.ok === 1){
      Swal.fire({
        title: 'Sucesso!',
        html: "Cidade cadastrada com sucesso!",
        icon: 'success',
        confirmButtonText: 'Fechar',
        toast: true,
        position: 'top-right',
        timer: 3000,
        timerProgressBar: true,
      });

      this.city_selected_event_emmiter.emit(response.city.id);

      this.is_requesting = false;
    }else{
      if(this.is_a_sub_component){
        if(response.city){
          Swal.fire({
            title: 'Erro!',
            html: "A cidade já existe. Já o selecionamos para você...",
            icon: 'error',
            confirmButtonText: 'Fechar',
            toast: true,
            position: 'top-right',
            timer: 3000,
            timerProgressBar: true,
          });

          this.city_selected_event_emmiter.emit(response.city.id);
        }else{
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

      this.is_requesting = false;
    }
  }

  field_values:any = [];
  async setField(name:any,value:any){
    this.field_values[name] = value;
  }


  form_started = false;
  ngOnInit(): void {
    this.listCountries(()=>{
      this.is_requesting = false;


      setTimeout(()=>{
        if(this.input_country_id > 0 || this.input_state_id > 0){
          if(this.input_country_id > 0){
            this.country_id = this.input_country_id;

            this.listStates(()=>{
              if(this.input_state_id > 0){
                this.state_id = this.input_state_id;

                this.setField("state_id",this.state_id);

                this.form_started = true;
              }
            })
          }
        }else{
          this.getDefaults(()=>{
            this.form_started = true;
          });
        }
      },300);
    });
  }


  getDefaults(callback:any = null){
    let defaults = DefaultSingleton.getInstance().getDefaults();

    this.setDefaults(defaults, callback);
  }

  setDefaults(defaults:XadrezSuicoDefault,callback:any = null){
    console.log(defaults);

    if(defaults.country_default){
      console.log("defaults: country - ".concat(String(defaults.country_default)));
      this.country_id = Number(defaults.country_default);

      this.listStates(()=>{
        if(defaults.state_default){
          console.log(this.states);
          console.log("defaults: state");
          this.state_id = Number(defaults.state_default);
        }
      });
    }
  }



  country_id:number = 0;
  state_id:number = 0;

  countries:Array<Select2Option> = [];
  states:Array<Select2Option> = [];

  previne_country_update = false;
  previne_state_update = false;

  async listCountries(callback:any = null){
    let response = await this.country_controller.list();
    if(response.ok){
      await this.parseCountriesToSelect2(response.countries);

      if(callback){
        setTimeout(()=>{
          callback();
        },200);
      }
    }
  }

  async parseCountriesToSelect2(countries:Array<Country>, callback:any = null){
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
    let response = await this.state_controller.list(this.country_id);
    if(response.ok){
      await this.parseStatesToSelect2(response.states);

      if(callback){
        callback();
      }
    }
  }

  async parseStatesToSelect2(states:Array<State>, callback:any = null){
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


  updateCountry(e:any){
    this.country_id = e.value;

    if(this.form_started) this.listStates();

    this.state_id = 0;
  }
  updateState(e:any){
    this.state_id = e.value;

    this.setField("state_id",this.state_id);
  }

}
