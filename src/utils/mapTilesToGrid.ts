import type { TileProps } from "../types/TileProps";

export const mapTilesToGrid = (tiles: TileProps[]): (TileProps | null)[] => {
  const grid = Array(91).fill(null); // Wszystkie pola (też te puste)

  const top = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const right = [25, 38, 51, 64, 77];
  const bottom = [90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78];
  const left = [65, 52, 39, 26, 13];

  const tileIndexes = [...top, ...right, ...bottom, ...left];

  tileIndexes.forEach((gridIndex, tileIndex) => {
    grid[gridIndex] = tiles[tileIndex] ?? null;
  });

  return grid;
};
