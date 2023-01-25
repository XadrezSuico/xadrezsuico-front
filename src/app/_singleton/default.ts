import { XadrezSuicoDefault } from '../_intefaces/default';
export class DefaultSingleton{

  private static _instance: DefaultSingleton;
  private constructor(){}

  public static getInstance(){
    return this._instance || (this._instance = new this());
  }

  defaults:XadrezSuicoDefault = {}

  public setDefaults(defaults:XadrezSuicoDefault){
    this.defaults = defaults;
  }

  public getDefaults(){
    return this.defaults;
  }
}
