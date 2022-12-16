import React, {useState, useEffect} from 'react';
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
    <AppBar position='sticky'>Coordinate Transformation Tool</AppBar>
    <Grid>
      <Grid item xs={12} md={6}>
        <TextField label="easting" variant="outlined" onChange= { (event) => {setLatitude(event.target.value)} }/>
        <TextField label="northing" variant="outlined" onChange= { (event) => {setLongitude(event.target.value)} }/>
      </Grid><br/><br/>
      <Grid item xs={12}>
        <div className="dropdown">
        <Button variant="contained" onClick={handleOpen} className="menu">Dropdown</Button>
        {open ? (
          <ul className="menu">
            <li className="menu-item">
              <Button variant="contained" onClick={ () => wgs84tolv95() }>WGS84 zu LV95</Button>
            </li>
            <li className="menu-item">
              <Button variant="contained" onClick={ () => lv95towgs84() }>LV95 zu WGS84</Button>
            </li>
            <li className='="menu-item'>
              <Button variant='contained' onClick={ () => lv95tolv03() }>LV95 zu LV03</Button>
            </li>
          </ul>
        ) : null}
      </div>
      </Grid>
      {/* <Grid item xs={12}>
        <TextField class="output" readOnly/>
      </Grid> */}
    </Grid><br/><br/>
        
    
    {loading &&
      <h1>Bitte warten... Die Daten werden geladen!</h1>
    }

    {error &&
      <h4>Fehler: Überprüfe deine Wahl der Koordinatentransformation oder versichere dich, dass du mit dem Internet verbunden bist.</h4>
    }

    {data &&
    <>
      Daten sind geladen!
      <div>{data.ost}</div>
      <div>{data.nord}</div>
    </>
    }
    </>
}

export default App;

