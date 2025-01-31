import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css'],
})
export class MiniMapComponent implements AfterViewInit {
  @Input() lngLat?: [number, number];

  @ViewChild('map')
  public divmap?: ElementRef;

  ngAfterViewInit(): void {
    if (!this.divmap) throw 'El elemento HTML no fue encontrado';
    if (!this.lngLat) throw "LngLat can't be null";

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const map = new Map({
      container: this.divmap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false,
    });

    const marker = new Marker({
      color: color,
    })
      .setLngLat(this.lngLat)
      .addTo(map);
  }
}
