"use client"
import React, { useState } from 'react';
import regions from '../../svg-parser/regions.json';

const SvgMap = () => {
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
    const [tooltipContent, setTooltipContent] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = (event: React.MouseEvent<SVGPathElement, MouseEvent>, regionId: string, fullName: string) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setHoveredRegion(regionId);
        setTooltipContent(fullName);
        setTooltipPosition({ x: rect.left + rect.width / 2, y: rect.top - rect.height / 2 });
    };

    const handleMouseLeave = () => {
        setHoveredRegion(null);
        setTooltipContent('');
    };

    const getFillColor = (regionId: string, hasInfo: boolean) => {
        if (regionId === hoveredRegion) {
            return hasInfo ? "#ADD8E6" : "#ECF2FE";
        }
        return "white";
    };

    return (
        <div className="relative">
            <svg width="1439" height="872" viewBox="0 0 1439 872" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_202_6687)">
                    {regions.map(region => (
                        <path
                            key={region.id}
                            d={region.pathD}
                            fill={getFillColor(region.id, region.hasInfo)}
                            stroke="#D4DFF5"
                            strokeWidth="1"
                            onMouseEnter={(event) => handleMouseEnter(event, region.id, region.fullName)}
                            onMouseLeave={handleMouseLeave}
                            className="transition duration-150 ease-in-out cursor-pointer"
                        />
                    ))}
                </g>
                <defs>
                    <filter id="filter0_d_202_6687" x="0.303223" y="0.331116" width="1438.42" height="871.56"
                            filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                       result="hardAlpha"/>
                        <feOffset dy="20"/>
                        <feGaussianBlur stdDeviation="30"/>
                        <feColorMatrix type="matrix"
                                       values="0 0 0 0 0.395417 0 0 0 0 0.512376 0 0 0 0 0.9125 0 0 0 0.15 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_202_6687"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_202_6687" result="shape"/>
                    </filter>
                </defs>
            </svg>
            {hoveredRegion && (
                <div
                    className="absolute bg-white p-2 shadow-xl text-xs text-gray-800"
                    style={{
                        left: tooltipPosition.x,
                        top: tooltipPosition.y,
                        transform: 'translate(-50%, -20px)',
                        pointerEvents: 'none',
                        zIndex: 10,
                    }}
                >
                    {tooltipContent}
                </div>
            )}
        </div>
    );
};

export default SvgMap;
