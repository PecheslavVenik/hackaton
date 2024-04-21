"use client";
import React, { useState } from "react";
import SvgMap from "../../src/components/map"; // Импорт компонента карты, путь может варьироваться
import RegionData from "@/components/RegionData/RegionData"; // Импорт компонента данных о регионе

const Home: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState(null); // Состояние для хранения выбранного региона

  // Функция для обновления выбранного региона
  const handleSelectRegion = (region) => {
    setSelectedRegion(region);
  };

  // Функция для сброса выбранного региона
  const handleCloseRegionData = () => {
    setSelectedRegion(null);
  };

  return (
    <div>
      <SvgMap onSelectRegion={handleSelectRegion} />{" "}
      {/* Компонент карты, который позволяет выбирать регион */}
      {selectedRegion && (
        <RegionData
          region={selectedRegion}
          onClose={handleCloseRegionData} // Компонент с данными о регионе, который отображается после выбора региона
        />
      )}
    </div>
  );
};

export default Home;
