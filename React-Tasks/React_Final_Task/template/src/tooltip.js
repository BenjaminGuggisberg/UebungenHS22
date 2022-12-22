import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@radix-ui/react-tooltip';
import React, { useState } from 'react';
import { Button } from '@mui/material';
import './components/toolt.css';
import DisableAfterMouseOver from './Disable';

function App() {

  const [toolT, setToolT] = useState(true);


  function handletoolbar() {
    if (DisableAfterMouseOver === true) {
      setToolT(true);
      console.log(toolT);
    }
    if (DisableAfterMouseOver !== false) {
      setToolT(false);
      console.log(toolT);
    }
  }


  // function handletoolbarhidden() {
  //   setToolT(false);
  // }


  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <ul>
        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="trigger">
                <Button
                  className="knopf"
                  onMouseEnter={() => handletoolbar()}
                  color="secondary"
                  variant='contained'
                  disabled
                >Mouse over for Tooltip</Button>
              </TooltipTrigger>
              {toolT ? (<TooltipContent className="tooltip"><p className="text">Falsches Koordinatenformat:<br />Wähle für X- & Y-Koordinaten Werte in folgenden Bereichen:<br />X-Koordinaten: xx.xx.xx<br />Y-Koordinaten: yy.yy.yy</p></TooltipContent>) : null}
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="trigger">
                <Button
                  onMouseEnter={() => handletoolbar()}
                  // onMouseLeave={() => handletoolbarhidden()}
                  color="secondary"
                  variant='contained'
                >Mouse over for Tooltip</Button>
              </TooltipTrigger>
              {toolT ? (<TooltipContent className="tooltip"><p className="text">Falsches Koordinatenformat:<br />Wähle für X- & Y-Koordinaten Werte in folgenden Bereichen:<br />X-Koordinaten: xx.xx.xx<br />Y-Koordinaten: yy.yy.yy</p></TooltipContent>) : null}
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="trigger">
                <Button
                  onMouseEnter={() => handletoolbar()}
                  // onMouseLeave={() => handletoolbarhidden()}
                  color="secondary"
                  variant='contained'
                  disabled
                >Mouse over for Tooltip</Button>
              </TooltipTrigger>
              {toolT ? (<TooltipContent className="tooltip"><p className="text">Falsches Koordinatenformat:<br />Wähle für X- & Y-Koordinaten Werte in folgenden Bereichen:<br />X-Koordinaten: xx.xx.xx<br />Y-Koordinaten: yy.yy.yy</p></TooltipContent>) : null}
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>

    </div>
  );
}

export default App;
