interface Region {
  id: string;
  pathD: string;
  hasInfo: boolean;
  fullName: string;
  img?: string;
  bbox?: BBox;
}

export interface BBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TooltipData {
  id: string;
  content: string;
}
