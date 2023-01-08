import { EventPublicPlayer } from './../../../_interfaces/event-public-player';
import { RegisterEventPlayerController } from './../../../_controllers/register-event-player.controller';
import { EventPublic } from './../../../_interfaces/event-public';
import { Component, Input, OnInit } from '@angular/core';
import { faCircleNotch, faSpinner, faSearch } from '@fortawesome/free-solid-svg-icons';
import { EventPublicCategory } from 'src/app/registration-module/_interfaces/event-public-category';

@Component({
  selector: 'app-register-page-event-inscrever',
  templateUrl: './register-page-event-inscrever.component.html',
  styleUrls: ['./register-page-event-inscrever.component.scss']
})
export class RegisterPageEventInscreverComponent implements OnInit {

  faSearching = faCircleNotch;
  faSearch = faSearch;

  constructor(private register_event_player_controller:RegisterEventPlayerController) { }

  @Input()
  event!:EventPublic;
  ngOnInit(): void {
  }

  page = 'search'

  is_searching = false;
  search = '';
  searched = '';

  has_results = false;
  players:Array<EventPublicPlayer> = [];
  categories:Array<EventPublicCategory> = [];

  player!:EventPublicPlayer;
  fields:Array<string> = [];
  field_values:any = [];

  is_register_form = false;



  onSubmit(){
    if(!this.is_searching){
      this.doSearch();
      console.log(this.event);
    }else{
      alert(1)
    }
  }

  onSearchChanges(){
    this.is_searching = true;

    console.log(this.search);
  }

  async doSearch(){
    if(this.event){
      if(this.event.uuid){
        this.is_searching = true;
        this.has_results = false;

        let search = this.search;

        let response = await this.register_event_player_controller.search(this.event.uuid,search);
        if(response){
          if(response.ok){
            this.searched = search;
            this.players = response.players;
            this.has_results = true;
          }
        }
        this.is_searching = false;
      }
    }
  }

  async registerForm(player_id:number){
    if(this.event){
      if(this.event.uuid){
        let response = await this.register_event_player_controller.get(this.event.uuid,player_id);
        if(response){
          if(response.ok){
            this.player = response.player;

            if(response.fields.length > 0 ){
              this.page = 'update'
              this.fields = response.fields;
            }else{
              if(response.categories.length === 0){
                this.page = 'search';
                // TO DO ERROR - NO CATEGORIES
              }else{
                this.page = 'register'

                this.categories = response.categories;
              }
            }
          }
        }
      }
    }
  }

  async onSubmitUpdate(){

  }

  async onPlayerRegistered(){
    this.is_register_form = false;
    this.is_searching = false;
    this.page = 'search';

    this.search = '';
    this.searched = '';
    this.has_results = false;
  }
}
