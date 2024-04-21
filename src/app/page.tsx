"use client";
import React, { useState } from "react";
import SvgMap from "../../src/components/map";
import RegionData from "@/components/RegionData/RegionData";

const Home: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);

  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
  };

  const handleCloseRegionData = () => {
    setSelectedRegion(null);
  };

  return (
    <div>
      <SvgMap onSelectRegion={handleSelectRegion} />{" "}
      {selectedRegion && (
        <RegionData region={selectedRegion} onClose={handleCloseRegionData} />
      )}
    </div>
  );
};

export default Home;
