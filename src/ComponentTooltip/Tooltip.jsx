import React, { useState } from 'react';
import './tooltip.css';

export const Tooltip = ({ text, children }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => setShowTooltip(true);
    const handleMouseLeave = () => setShowTooltip(false);
    
    return (
        <div
            className={`tooltip-container ${showTooltip ? "visible" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            <div className="tooltip">{text}</div>
        </div>
    );
}

export default Tooltip;
