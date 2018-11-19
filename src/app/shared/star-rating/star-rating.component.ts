import { Component, OnChanges, Input, SimpleChange, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent implements OnChanges {
  public ngOnChanges(): void{
    this.starWidth = this.rating * 90/5;
  }
  @Input() rating: number;
  starWidth: number;

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  onClick(){
    this.notify.emit(`Clicked product rating: ${this.rating.toString()}`);
  }

  constructor() { }

}
