import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css'],
})
export class ZoomRangePageComponent implements AfterViewInit {
  @ViewChild('map')
  public divmap?: ElementRef;

  ngAfterViewInit(): void {
    console.log(this.divmap);

    if (!this.divmap) throw 'El elemento HTML no fue encontrado';

    const map = new Map({
      container: this.divmap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }
}
