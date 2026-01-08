import type { TileFromJSON, TileProps } from "../types/TileProps";
import tilesData from "../data/tiles.json";

export const generateTiles = (): TileProps[] => {
  return (tilesData as TileFromJSON[]).map((tile, index) => ({
    ...tile,
    id: index + 1,
    owner: null,
    // type: "chance", // !TESTING
  }));
};
