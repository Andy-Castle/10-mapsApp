import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css'],
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map')
  public divmap?: ElementRef;

  public zoom: number = 10;

  public map?: Map;

  public currentLngLat: LngLat = new LngLat(
    -99.23120105306828,
    21.840564007528073
  );

  ngAfterViewInit(): void {
    console.log(this.divmap);

    if (!this.divmap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divmap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    // this.map?.off('move', () => {
    //   this.mapListeners()
    // });
    this.map?.remove();
  }

  mapListeners() {
    if (!this.map) throw 'Mapa no inicializado';

    this.map.on('zoom', (event) => {
      // console.log(event);
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (event) => {
      // console.log(event);
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    });

    this.map.on('zoomend', (event) => {
      // console.log(event);
      if (this.map!.getZoom() > 2) return;
      this.map!.zoomTo(2);
    });

    this.map.on('move', (event) => {
      this.currentLngLat = this.map!.getCenter();
      // console.log(this.currentLngLat);
      const { lat, lng } = this.currentLngLat;
      // console.log(lat, lng);
    });
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged(value: string) {
    this.zoom = Number(value);

    this.map?.zoomTo(this.zoom);
  }
}
