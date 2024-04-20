// components/RegionLink.tsx

import React from "react";
import { useRouter } from "next/router";

type RegionLinkProps = {
  regionId: string;
  children: React.ReactNode;
};

const RegionLink: React.FC<RegionLinkProps> = ({ regionId, children }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/region/${regionId}`);
  };

  return (
    <a href={`/region/${regionId}`} onClick={handleClick}>
      {children}
    </a>
  );
};

export default RegionLink;
