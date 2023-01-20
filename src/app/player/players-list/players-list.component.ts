import { PlayerController } from './_controllers/player.controller';
import { Component, OnInit } from '@angular/core';
import { faCircleNotch, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Player } from './_interfaces/player';

@Component({
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {

  faSearching = faCircleNotch;
  faSearch = faSearch;

  is_searching = false;

  search:string = "";

  query:string = "";
  has_results = false;

  players:Array<Player> = [];

  constructor(private player_controller:PlayerController) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(!this.is_searching){
      this.doSearch();
    }else{
      // alert(1)
    }
  }


  async doSearch(){
      this.is_searching = true;
      this.has_results = false;

      let search = this.search;

      let response = await this.player_controller.list(search);
      if(response){
        if(response.ok){
          this.query = search;
          this.players = response.players;
          this.has_results = true;
        }
      }
      this.is_searching = false;
  }

}
