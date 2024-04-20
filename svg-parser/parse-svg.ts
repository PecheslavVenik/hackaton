import { JSDOM } from "jsdom";
import * as fs from "fs";
import * as path from "path";

interface Region {
    id: string;
    pathD: string;
    hasInfo: boolean;
    fullName: string;
}

const svgFilePath = path.join(__dirname, 'map.svg');
const svgContent = fs.readFileSync(svgFilePath, 'utf8');
const dom = new JSDOM(svgContent);

const paths = dom.window.document.querySelectorAll('svg path');
const regions: Region[] = Array.from(paths).map((path: Element, index: number) => {
    const id = path.id || `region-${index + 1}`;
    const pathD = path.getAttribute('d') || '';
    const hasInfo = path.hasAttribute('data-has-info');
    const fullName = path.getAttribute('data-full-name') || '';

    return {id, pathD, hasInfo, fullName};
});

fs.writeFileSync('regions.json', JSON.stringify(regions, null, 2), 'utf8');
