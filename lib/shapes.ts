import type { SectionId } from "./scroll";

export type Point = { x: number; y: number };

// Closed outlines in unit space (-1..1, y down), each starting at the top and
// running clockwise, so a morph from one shape to the next moves particles
// along the outline instead of crossing it.
const SQUARE: Point[] = [
  { x: 0, y: -0.75 },
  { x: 0.75, y: -0.75 },
  { x: 0.75, y: 0.75 },
  { x: -0.75, y: 0.75 },
  { x: -0.75, y: -0.75 },
  { x: 0, y: -0.75 },
];

const TRIANGLE: Point[] = [
  { x: 0, y: -1 },
  { x: 0.866, y: 0.5 },
  { x: -0.866, y: 0.5 },
  { x: 0, y: -1 },
];

// A plus sign whose arms are `halfWidth` thick on each side of the axis.
function plusOutline(halfWidth: number): Point[] {
  return [
    { x: 0, y: -1 },
    { x: halfWidth, y: -1 },
    { x: halfWidth, y: -halfWidth },
    { x: 1, y: -halfWidth },
    { x: 1, y: halfWidth },
    { x: halfWidth, y: halfWidth },
    { x: halfWidth, y: 1 },
    { x: -halfWidth, y: 1 },
    { x: -halfWidth, y: halfWidth },
    { x: -1, y: halfWidth },
    { x: -1, y: -halfWidth },
    { x: -halfWidth, y: -halfWidth },
    { x: -halfWidth, y: -1 },
    { x: 0, y: -1 },
  ];
}

// Spreads `count` points evenly by distance along the outline, so long edges
// don't end up sparser than short ones.
function sampleOutline(outline: Point[], count: number): Point[] {
  const edgeLengths = outline
    .slice(1)
    .map((point, i) =>
      Math.hypot(point.x - outline[i].x, point.y - outline[i].y),
    );
  const totalLength = edgeLengths.reduce((sum, length) => sum + length, 0);
  const points: Point[] = [];
  let edge = 0;
  let edgeStart = 0;
  for (let i = 0; i < count; i++) {
    const distance = (i / count) * totalLength;
    while (distance > edgeStart + edgeLengths[edge]) {
      edgeStart += edgeLengths[edge];
      edge++;
    }
    const along = (distance - edgeStart) / edgeLengths[edge];
    const from = outline[edge];
    const to = outline[edge + 1];
    points.push({
      x: from.x + (to.x - from.x) * along,
      y: from.y + (to.y - from.y) * along,
    });
  }
  return points;
}

function circle(count: number): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < count; i++) {
    const angle = -Math.PI / 2 + (i / count) * Math.PI * 2;
    points.push({ x: Math.cos(angle), y: Math.sin(angle) });
  }
  return points;
}

// The ✕ is a thin plus turned 45°; the arm length is scaled so its tips stay in the unit box.
function cross(count: number): Point[] {
  const scale = Math.SQRT1_2;
  return sampleOutline(plusOutline(0.15), count).map((point) => ({
    x: (point.x - point.y) * scale,
    y: (point.x + point.y) * scale,
  }));
}

// PlayStation face buttons plus a D-pad, one per section.
export const SECTION_SHAPES: Record<SectionId, (count: number) => Point[]> = {
  home: cross,
  about: circle,
  work: (count) => sampleOutline(TRIANGLE, count),
  projects: (count) => sampleOutline(SQUARE, count),
  contact: (count) => sampleOutline(plusOutline(0.33), count),
};
