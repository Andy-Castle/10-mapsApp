import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.components.css'],
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map')
  public divmap?: ElementRef;

  public map?: Map;

  public currentLngLat: LngLat = new LngLat(
    -99.23120105306828,
    21.840564007528073
  );

  ngAfterViewInit(): void {
    if (!this.divmap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divmap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 10, // starting zoom
    });

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Andy';

    // const marker = new Marker({
    //   // color: 'red',
    //   element: markerHtml,
    // })
    //   .setLngLat(this.currentLngLat)
    //   .addTo(this.map!);
  }
}
