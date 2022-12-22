import React, { useState } from 'react';
import  Grid  from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, Toolbar } from '@mui/material';
import axios from 'axios';
import './App.css';
import AppBar from '@mui/material/AppBar';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@radix-ui/react-tooltip';
import Footer from './components/Footer';
import Names from './components/Names';
import Mail from './components/Mail';
// import Testtip from './components/conditionaltooltip';
// import DisableAfterMouseOver from './Disable';


function App() {
  const [lat, setLatitude] = useState(47.5349);
  const [lng, setLongitude] = useState(7.6417);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const [open, setOpen] = useState(false);

  // const [visible, setVisibility] = useState(true);
  // function validCoord(lat, lon, crs=lv95) {
  //   if lat >= 200 {
  //     fdk
  //   };
  // }

  const [onsight, setSight] = useState(true);
  const [disable, setDisable] = useState(false)


  function handletoolbar() {
    if (disable === true) {
      setSight(true); 
      // console.log(onsight);
    }
    if (disable === false) {
      setSight(false);
      // console.log(onsight);
    }
  }

  function handletoolbarhidden() {
    setSight(false);
  }


  function handleOpen() {
    setOpen(!open);
  }
  // const [handleOpen] = () => {
  //   setOpen(!open);
  // };


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
    <AppBar sx={{background:'black', color:'peachpuff'}} position='sticky' className="appbar">Coordinate Transformation Tool</AppBar>
    <div className='main'>
      <Grid>
        <div className="input">
            <div className="field_one"><TextField sx={{"&label":{color:'black'}}} type="number" label="easting" variant="filled" onChange= { (event) => {setLatitude(event.target.value)} } id="halo"/></div>
            <div className="field_two"><TextField sx={{"&label":{color:'black'}}} type="number" label="northing" variant="filled" onChange= { (event) => {setLongitude(event.target.value)} } className="Feld2"/></div>
        </div>
        <Grid item xs={12}>
          <div className="dropdown">
            <div className="wrapper">
              <Button sx={{background:'black', color:'peachpuff', "&:hover":{background:'peachpuff', color:'black'}}} variant="contained" onClick={handleOpen} className="menu">Choose Transformation</Button>
            </div>
            {open ? (
              <ul className="menu">
                <li className="menu-item-top">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="trigger">
                        <Button 
                          id = "Button1"
                          sx={{width:'250px', background:'black', color:'peachpuff', "&:hover":{background:'peachpuff', color:'black'}}}
                          onMouseEnter={() => handletoolbar()}
                          onMouseLeave={() => handletoolbarhidden()}
                          onClick={ () => wgs84tolv95() }
                          variant="contained"
                          disabled={(Math.abs(lat) > 180) || (Math.abs(lng) > 90) ? true : false}
                          >WGS84 zu LV95</Button>
                      </TooltipTrigger>
                      {onsight ? (<TooltipContent className="tooltip"><p className="text">Falsches Koordinatenformat:<br />Wähle für X- & Y-Koordinaten Werte in folgenden Bereichen:<br />X-Koordinaten: xx.xx.xx<br />Y-Koordinaten: yy.yy.yy</p></TooltipContent>) : null}
                    </Tooltip>
                  </TooltipProvider>
                </li>
                <li className="menu-item">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="trigger">
                        <Button 
                          sx={{width:'250px', background:'black', color:'peachpuff', "&:hover":{background:'peachpuff', color:'black'}}}
                          onMouseEnter={() => handletoolbar()}
                          onMouseLeave={() => handletoolbarhidden()}
                          color="secondary"
                          variant="contained"
                          disabled={(Math.abs(lat) > 2540398) || (Math.abs(lat) < 2480555) || (Math.abs(lng) > 1300660) || (Math.abs(lng) < 1070927) ? true : false }
                          onClick={ () => lv95towgs84() }
                          >LV95 zu WGS84</Button>
                      </TooltipTrigger>
                      {onsight ? (<TooltipContent className="tooltip"><p className="text">Falsches Koordinatenformat:<br />Wähle für X- & Y-Koordinaten Werte in folgenden Bereichen:<br />X-Koordinaten: xx.xx.xx<br />Y-Koordinaten: yy.yy.yy</p></TooltipContent>) : null}
                    </Tooltip>
                  </TooltipProvider>
                </li>
                <li className='menu-item'>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="trigger">
                        <Button 
                          sx={{width:'250px', background:'black', color:'peachpuff', "&:hover":{background:'peachpuff', color:'black'}}}
                          onMouseEnter={() => handletoolbar()}
                          // onMouseLeave={() => handletoolbarhidden()}
                          color="secondary"
                          variant='contained' 
                          disabled={(Math.abs(lat) > 2540398) || (Math.abs(lat) < 2480555) || (Math.abs(lng) > 1300660) || (Math.abs(lng) < 1070927) ? true : false }
                          onClick={ () => lv95tolv03() }
                          >LV95 zu LV03</Button>
                      </TooltipTrigger>
                      {onsight ? (<TooltipContent className="tooltip"><p className="text">Falsches Koordinatenformat:<br />Wähle für X- & Y-Koordinaten Werte in folgenden Bereichen:<br />X-Koordinaten: xx.xx.xx<br />Y-Koordinaten: yy.yy.yy</p></TooltipContent>) : null}
                    </Tooltip>
                  </TooltipProvider>
                </li>
                <li className="menu-item">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="trigger">
                        <Button 
                          sx={{width:'250px', background:'black', color:'peachpuff', "&:hover":{background:'peachpuff', color:'black'}}}
                          onMouseEnter={() => handletoolbar()}
                          onMouseLeave={() => handletoolbarhidden()}
                          color="secondary"
                          variant="contained"
                          disabled
                          // onClick
                          >WGS84 zu LV03</Button>
                      </TooltipTrigger>
                      {onsight ? (<TooltipContent className="tooltip"><p className="text">Falsches Koordinatenformat:<br />Wähle für X- & Y-Koordinaten Werte in folgenden Bereichen:<br />X-Koordinaten: xx.xx.xx<br />Y-Koordinaten: yy.yy.yy</p></TooltipContent>) : null}
                    </Tooltip>
                  </TooltipProvider>
                </li>
                <li className="menu-item">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="trigger">
                        <Button 
                          sx={{width:'250px', background:'black', color:'peachpuff', "&:hover":{background:'peachpuff', color:'black'}}}
                          onMouseEnter={() => handletoolbar()}
                          // onMouseLeave={() => handletoolbarhidden()}
                          color="secondary"
                          variant="contained"
                          disabled
                          // onClick
                          >LV03 zu LV95</Button>
                      </TooltipTrigger>
                      {onsight ? (<TooltipContent className="tooltip"><p className="text">Falsches Koordinatenformat:<br />Wähle für X- & Y-Koordinaten Werte in folgenden Bereichen:<br />X-Koordinaten: xx.xx.xx<br />Y-Koordinaten: yy.yy.yy</p></TooltipContent>) : null}
                    </Tooltip>
                  </TooltipProvider>
                </li>
                <li className="menu-item">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="trigger">
                        <Button 
                          sx={{width:'250px', background:'black', color:'peachpuff', "&:hover":{background:'peachpuff', color:'black'}}}
                          onMouseEnter={() => handletoolbar()}
                          // onMouseLeave={() => handletoolbarhidden()}
                          color="secondary"
                          variant="contained"
                          disabled
                          // onClick
                          >LV03 zu WGS84</Button>
                      </TooltipTrigger>
                      {onsight ? (<TooltipContent className="tooltip"><p className="text">Falsches Koordinatenformat:<br />Wähle für X- & Y-Koordinaten Werte in folgenden Bereichen:<br />X-Koordinaten: xx.xx.xx<br />Y-Koordinaten: yy.yy.yy</p></TooltipContent>) : null}
                    </Tooltip>
                  </TooltipProvider>
                </li>
                <li className="menu-item">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="trigger">
                        <form action="https://burgdorferbier.ch/" target="_blank">
                          <button
                          onMouseEnter={() => handletoolbar()}
                          // onMouseLeave={() => handletoolbarhidden()}
                          id='MUItoCSS'
                          >LV03 zu BD99</button>
                        </form>
                      </TooltipTrigger>
                      {onsight ? (<TooltipContent className="tooltip"><p className="text">Falsches Koordinatenformat:<br />Wähle für X- & Y-Koordinaten Werte in folgenden Bereichen:<br />X-Koordinaten: xx.xx.xx<br />Y-Koordinaten: yy.yy.yy</p></TooltipContent>) : null}
                    </Tooltip>
                  </TooltipProvider>
                </li>
              </ul>
            ) : null}
        </div>
        </Grid>
      </Grid><br/><br/>
           
      
      {data &&
          <>
          <div className='output'>
            <Grid>
              <div className="output_one"><TextField value={data.ost} variant="outlined" label="Easting" readOnly></TextField></div>
              <div className="output_two"><TextField value={data.nord} variant="outlined" label="Northin" readOnly></TextField></div>
            </Grid>
          </div>
      </>
      }
    
    </div>
    <div className="error">
          {error &&
            <p>Fehler... Prüfen Sie ihre Internetverbindung! (Fehlercode: 404)</p>
          }
        </div>
  </div>
  <div id='Appbar2'>
    <Names/>
    <Footer/>
    {/* <Mail/> */}
  </div>
</> 
}

export default App;

