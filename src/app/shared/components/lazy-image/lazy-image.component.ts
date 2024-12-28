import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit{
  ngOnInit(): void {
    if(!this.url)
      throw new Error("Url is required");
  }
  public hasLoaded:boolean = false;
  @Input()
  public url!:string;

  @Input()
  public alt:string = "";

  onLoad(){
    setTimeout(() => {
      this.hasLoaded = true;
    }, 1000);
  }
}
