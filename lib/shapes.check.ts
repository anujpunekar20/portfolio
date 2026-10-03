// Run with `node lib/shapes.check.ts`.
import assert from "node:assert";
import { SECTION_SHAPES } from "./shapes.ts";

for (const [section, shape] of Object.entries(SECTION_SHAPES)) {
  const points = shape(500);
  assert.equal(points.length, 500, section);
  for (const point of points) {
    assert.ok(Math.abs(point.x) <= 1 && Math.abs(point.y) <= 1, section);
  }
}
console.log("shapes ok");
