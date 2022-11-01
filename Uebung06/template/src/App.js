import React from 'react';
import "./App.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Circle} from 'react-leaflet';

// vm12.sourcelab.ch/akw_webmap

function App() {

  React.useEffect(() => {
    const L = require("leaflet");

    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png")
    });
  }, []);

  var swisstopo = (<TileLayer url="https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg"
                  attribution='&copy; swisstopo'></TileLayer>)

//  var polyline = [
//    [47.2, 7.2],
//    [47.4, 7.9],
//    [47.2, 8.5],
//    [47.2, 7.2],
//  ];

//  var polystyle = {color: 'green', weight: 5};

  const AKW = {
    0: {
      name: "AKW Mühleberg",
      pos: [46.96889071341903, 7.268068552223781]},
    1: {
      name: "AKW Gösgen",
      pos: [47.36554461723182, 7.967505456202076]},
    2: {
      name: "AKW Beznau",
      pos: [47.55207044424617, 8.228176219572873]},
    3: {
      name: "AKW Leibstadt",
      pos: [47.60153603742506, 8.183685307556686]},
  
 }

  // var circleOptions = {color:'red', fillColor: '#f03', fillOpacity: 0};


return (
  <>
  <MapContainer center={[46.9510827861504654, 7.4386324175389165]} zoom={8} scrollWheelZoom={true}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  />
  {swisstopo}
  <Circle center={AKW[0].pos} radius={50000} color='red' fillColor='#f03' fillOpacity={0.2}>
    <Popup>
      {AKW[0].name}<br/>50km Umfeld
    </Popup>
  </Circle>
  <Circle center={AKW[1].pos} radius={50000} color='red' fillColor='#f03' fillOpacity={0.2}>
    <Popup>
      {AKW[1].name}<br/>50km Umfeld
    </Popup>
  </Circle>
  <Circle center={AKW[2].pos} radius={50000} color='red' fillColor='#f03' fillOpacity={0.2}>
    <Popup>
      {AKW[2].name}<br/>50km Umfeld
    </Popup>
  </Circle>
  <Circle center={AKW[3].pos} radius={50000} color='red' fillColor='#f03' fillOpacity={0.2}>
    <Popup>
      {AKW[3].name}<br/>50km Umfeld
    </Popup>
  </Circle>


  {/* <Polyline pathOptions={polystyle} positions={polyline}></Polyline> */}
  <Marker position={AKW[0].pos}>
    <Popup>
    <strong>{AKW[0].name}</strong>
    </Popup>
  </Marker>
  <Marker position={AKW[1].pos}>
    <Popup>
      <strong>{AKW[1].name}</strong>
    </Popup>
  </Marker>
  <Marker position={AKW[2].pos}>
    <Popup>
      <strong>{AKW[2].name}</strong>
    </Popup>
  </Marker>
  <Marker position={AKW[3].pos}>
    <Popup>
      <strong>{AKW[3].name}</strong>
    </Popup>
  </Marker>

</MapContainer>
</>
  );
}

export default App;
