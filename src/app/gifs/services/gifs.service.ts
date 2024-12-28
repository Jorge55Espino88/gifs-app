import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

//Servicio totalmente disponible a lo largo de la aplicacion
@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList:Gif[] = [];

  private _tagsHistory:string[] = [];
  private apiKey:string = "GIitWC5mNtSsIraUpNM1sWKojPHGWItx";
  private servicioUrl:string = "https://api.giphy.com/v1/gifs";

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  organizeHistory(tag:string){
    tag = tag.toLowerCase();

    //Verifica si el usuario ya había escogido un tag para que no haya duplicados
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0,10); //No muestre más de 10
    this.saveLocalStotage();
  }

  private saveLocalStotage():void{
    localStorage.setItem("history", JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{

    //Verifica si tiene gifs o no
    if(!localStorage.getItem("history"))
      return;

    this._tagsHistory = JSON.parse(localStorage.getItem("history")!);

    if(this._tagsHistory.length === 0)
      return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag:string):void{
    if(tag.length === 0)
      return;

    this.organizeHistory(tag);

    const params = new HttpParams()
    .set("api_key", this.apiKey)
    .set("limit", "10")
    .set("q", tag);

    this.http.get<SearchResponse>(`${this.servicioUrl}/search`, {params}).subscribe(resp => {
      this.gifList = resp.data;
    });


    //this._tagsHistory.unshift(tag); //Añade al principio.
  }
}
