import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css'],
})
export class ZoomRangePageComponent implements AfterViewInit {
  @ViewChild('map')
  public divmap?: ElementRef;

  public zoom: number = 10;

  public map?: Map;

  ngAfterViewInit(): void {
    console.log(this.divmap);

    if (!this.divmap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divmap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
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
