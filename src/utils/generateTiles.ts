import type { TileFromJSON, TileProps } from "../types/TileProps";
import tilesData from "../data/tiles.json";
import Property from "../game/property";

export const generateTiles = (): TileProps[] => {
  return (tilesData as TileFromJSON[]).map((tile, index) => {
    const base = {
      ...tile,
      id: index + 1,
      owner: null,
      players: [],
    };

    if (tile.type === "property") {
      return new Property({
        ...base,
        price: tile.price!,
        tax: tile.tax!,
      });
    }

    return base;
  });
};
