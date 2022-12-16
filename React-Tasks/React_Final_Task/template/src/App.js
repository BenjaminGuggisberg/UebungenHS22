import React, {useState, useEffect, useId} from 'react';
import  Grid  from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import './App.css';
import AppBar from '@mui/material/AppBar';

function App() {
  const [lat, setLatitude] = useState(47.5349);
  const [lng, setLongitude] = useState(7.6417);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const [open, setOpen] = React.useState(false);

  // const [visible, setVisibility] = useState(true);
  // function validCoord(lat, lon, crs=lv95) {
  //   if lat >= 200 {
  //     fdk
  //   };
  // }

  function handleOpen() {
    setOpen(!open);
  }
  // const [handleOpen] = () => {
  //   setOpen(!open);
  // };

  useEffect( () => {console.log(""); });

  function wgs84tolv95() {
    var url = `https://vm24.sourcelab.ch/proj/wgs84lv95?lng=${lng}&lat=${lat}`
    // console.log("DOWNLOAD");
    setLoading(true);
    axios.get(url).then( (response) => {setData(response.data);} ).catch( (error) => {setError(error);} ).finally( () => {setLoading(false);} )
    setOpen(false)
  }

  function lv95towgs84() {
    var url = `https://vm24.sourcelab.ch/proj/lv95wgs84?lng=${lng}&lat=${lat}`
    setLoading(true);
    axios.get(url).then( (response) => {setData(response.data);} ).catch( (error) => {setError(error);} ).finally( () => {setLoading(false);} )
    setOpen(false)
  }

  function lv95tolv03() {
    var url = `https://vm24.sourcelab.ch/proj/lv95lv03?lng=${lng}&lat=${lat}`
    setLoading(true);
    axios.get(url).then( (response) => {setData(response.data);} ).catch( (error) => {setError(error);} ).finally( () => {setLoading(false);} )
    setOpen(false)
  }
  
  console.log(data)
  
  return <>
  <div className="body">
    <AppBar color='secondary' position='sticky' className="appbar">Coordinate Transformation Tool</AppBar>
    <div className='main'>
      <Grid>
        <Grid item xs={12} className="sowas">
          <div className="feld1">
            <TextField type="number" label="easting" variant="filled" color="secondary" onChange= { (event) => {setLatitude(event.target.value)} } id="halo"/>
            <TextField type="number" label="northing" variant="filled" color="secondary" onChange= { (event) => {setLongitude(event.target.value)} } className="Feld2"/>
          </div>
        </Grid><br/><br/>
        <Grid item xs={12}>
          <div className="dropdown">
            <div className="wrapper">
              <Button color="secondary" variant="contained" onClick={handleOpen} className="menu">Choose Transformation</Button>
            </div>
            {open ? (
              <ul className="menu">
                <li className="menu-item">
                  <Button 
                  color="secondary"
                  variant="contained"
                  disabled={(Math.abs(lat) > 180) || (Math.abs(lng) > 90) ? true : false}
                  onClick={ () => wgs84tolv95() }
                  >WGS84 zu LV95</Button>
                </li>
                <li className="menu-item">
                  <Button 
                  color="secondary"
                  variant="contained"
                  disabled={(Math.abs(lat) > 2540398) || (Math.abs(lat) < 2480555) || (Math.abs(lng) > 1300660) || (Math.abs(lng) < 1070927) ? true : false }
                  onClick={ () => lv95towgs84() }
                  >LV95 zu WGS84</Button>
                </li>
                <li className='menu-item'>
                  <Button 
                  color="secondary"
                  variant='contained' 
                  disabled={(Math.abs(lat) > 2540398) || (Math.abs(lat) < 2480555) || (Math.abs(lng) > 1300660) || (Math.abs(lng) < 1070927) ? true : false }
                  onClick={ () => lv95tolv03() }
                  >LV95 zu LV03</Button>
                </li>
              </ul>
            ) : null}
        </div>
        </Grid>
        {/* <Grid item xs={12}>
          <TextField class="output" readOnly/>
        </Grid> */}
      </Grid><br/><br/>

      {data &&
          <>
            <Grid>
              <TextField value={data.ost} variant="outlined" label="Easting" readOnly></TextField>
              <TextField value={data.nord} variant="outlined" label="Northin" readOnly></TextField>
            </Grid>
      </>
      }
    </div>

  </div>
</> 
}

export default App;

