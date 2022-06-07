import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { Icon, Style } from 'ol/style';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements OnInit {
  map!: Map;
  cityList: any;
  userList: any[] = [];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    const storedUsers = localStorage.getItem('userList')!;
    this.userList = JSON.parse(storedUsers);
    this.http.get('assets/cities.json').subscribe((data) => {
      this.cityList = data;
      if (this.userList && this.userList.length) {
        this.generatedMapView();
      }
    });
  }
  generatedMapView() {
    const markerList: any[] = [];
    this.userList.forEach((data) => {
      const cityStr =
        data.city[0].toUpperCase() + data.city.toLowerCase().slice(1);
      if (this.cityList[cityStr]) {
        const latLong = this.cityList[cityStr].GeoCode;
        const marker = new Feature({
          geometry: new Point(fromLonLat([latLong[1], latLong[0]])),
        });
        marker.setStyle(
          new Style({
            image: new Icon({
              color: '#8959A8',
              crossOrigin: 'anonymous',
              src: 'assets/marker.svg',
              imgSize: [20, 20],
            }),
          })
        );
        markerList.push(marker);
      }
    });
    const vectorSource = new VectorSource({
      features: markerList,
    });
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    this.map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 3,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      target: 'ol-map',
    });
  }
}
