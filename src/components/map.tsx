"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import regions from "../../svg-parser/regions.json";
import { BBox } from "@/types/types";
import RegionData from "@/components/RegionData/RegionData";

interface Region {
  id: string;
  pathD: string;
  hasInfo: boolean;
  fullName: string;
  img?: string;
  bbox?: BBox;
}

interface MarkerProps {
  x: number;
  y: number;
  color: string;
}

const typedRegions: Region[] = regions as Region[];

const getRandomColor = (): string => {
  const colors = ["red", "green", "blue", "yellow"];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Marker: React.FC<MarkerProps> = ({ x, y, color }) => {
  const style = useSpring({
    from: { opacity: 0 },
    to: async (next, cancel) => {
      await next({ opacity: 1 });
      await next({ opacity: 0 });
    },
    config: { duration: 2000 },
  });

  return <animated.circle cx={x} cy={y} r="5" fill={color} style={style} />;
};

interface SvgMapProps {
  onSelectRegion: (region) => void;
}

const SvgMap: React.FC<SvgMapProps> = ({ onSelectRegion }: SvgMapProps) => {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [viewBox, setViewBox] = useSpring(() => ({ viewBox: "0 0 1500 900" }));
  const [markers, setMarkers] = useState<MarkerProps[]>([]);
  const pathRefs = useRef<Map<string, SVGPathElement | null>>(new Map());
  const [showRegionData, setShowRegionData] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomRegionIndex = Math.floor(Math.random() * regions.length);
      const region = regions[randomRegionIndex];
      const path = pathRefs.current.get(region.id);
      if (path) {
        const bbox = path.getBBox();
        const x = bbox.x + Math.random() * bbox.width;
        const y = bbox.y + Math.random() * bbox.height;

        const newMarker = {
          x,
          y,
          color: getRandomColor(),
        };

        setMarkers((currentMarkers) => [...currentMarkers, newMarker]);

        if (markers.length > 3) {
          markers.shift(); // Keep the number of markers manageable
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [markers]);

  const handleRegionClick = (regionId: string) => {
    const regionData = typedRegions.find((region) => region.id === regionId);
    if (regionData) {
      setSelectedRegion(regionData); // Store the selected region
      setShowRegionData(true); // Show the RegionData component

      const path = pathRefs.current.get(regionId);
      if (path) {
        const bbox = path.getBBox();
        const centerX = bbox.x + bbox.width / 2;
        const centerY = bbox.y + bbox.height / 2;
        const newWidth = Math.max(bbox.width * 1.1, 300);
        const newHeight = Math.max(bbox.height * 1.1, 300);

        const newX = centerX - newWidth / 2;
        const newY = centerY - newHeight / 2;

        setViewBox.start({
          viewBox: `${newX} ${newY} ${newWidth} ${newHeight}`,
        });
      } else {
        console.error("No region found with the given ID");
        setShowRegionData(false); // Убедитесь, что это состояние обрабатывается
      }
    }
  };

  useEffect(() => {
    console.log("Show Region Data State:", showRegionData); // Для отладки
  }, [showRegionData]);

  const handleMouseEnter = (
    event: React.MouseEvent<SVGPathElement, MouseEvent>,
    regionId: string,
    fullName: string,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredRegion(regionId);
    setTooltipContent(fullName);
    setTooltipPosition({ x: rect.left + rect.width / 2, y: rect.top / 2 });
  };

  const handleMouseLeave = () => {
    setHoveredRegion(null);
    setTooltipContent("");
  };

  const getFillColor = (regionId: string, hasInfo: boolean) => {
    if (regionId === hoveredRegion) {
      return hasInfo ? "#ADD8E6" : "#ECF2FE";
    }
    return "white";
  };

  return (
    <div className="container p-0">
      <animated.svg
        width="1500"
        height="900"
        viewBox={viewBox.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_202_6687)">
          {regions.map((region) => (
            <path
              key={region.id}
              d={region.pathD}
              fill={getFillColor(region.id, region.hasInfo)}
              stroke="#D4DFF5"
              strokeWidth="1"
              onClick={() => handleRegionClick(region.id)}
              onMouseLeave={handleMouseLeave}
              className="transition duration-150 ease-in-out cursor-pointer"
            />
          ))}
        </g>
        <defs>
          <filter
            id="filter0_d_202_6687"
            x="0.303223"
            y="0.331116"
            width="1500"
            height="900"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="20" />
            <feGaussianBlur stdDeviation="30" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.395417 0 0 0 0 0.512376 0 0 0 0 0.9125 0 0 0 0.15 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_202_6687"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_202_6687"
              result="shape"
            />
          </filter>
        </defs>
        {markers.map((marker, index) => (
          <Marker key={index} x={marker.x} y={marker.y} color={marker.color} />
        ))}
      </animated.svg>
      {showRegionData && selectedRegion && (
        <RegionData
          region={selectedRegion}
          onClose={() => setShowRegionData(false)}
        />
      )}
      {hoveredRegion && (
        <div
          className="absolute bg-white p-2 shadow-xl text-lg font-bold text-gray-800"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: "translate(-50%, 80px)",
            pointerEvents: "none",
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
