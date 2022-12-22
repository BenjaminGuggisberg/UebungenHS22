import { TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import React from 'react';
import { useState } from 'react';
import Tooltip from 'codex-tooltip';

const CiaoBello = ({ isEnabled, onClick }) => {
  const [tooltipText, setTooltipText] = useState(false)

  const handleMouseEnter = () => {
    if (true) {
      setTooltipText('Click to perform an action');
    } else {
      setTooltipText('This button is disabled');
    }
  };

  return (
    <div>
      <p>hallo</p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <button onClick={onClick} onMouseEnter={handleMouseEnter} disabled={!isEnabled}>
              My Button
            </button>
          </TooltipTrigger>
          <TooltipContent>
          {tooltipText ? <div className="tooltip">{tooltipText}</div> : null}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

    </div>
  );
};

export default CiaoBello;