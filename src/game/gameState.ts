import type { AlkopolyPlayer } from "../types/PlayerProps";
import type { TileProps } from "../types/TileProps";
import { generateTiles } from "../utils/generateTiles";

const INITIAL_TILES = generateTiles();
const BONUS_MONEY = 400;

export default class GameStateManager {
  private players: Record<string, AlkopolyPlayer> = {};
  private currentPlayerId: string = "";
  private gameStarted: boolean = false;
  private reward: number = 0;
  public readonly tiles: TileProps[] = INITIAL_TILES;

  // GETTERY
  getPlayers(): Record<string, AlkopolyPlayer> {
    return { ...this.players };
  }

  getPlayersArray(): AlkopolyPlayer[] {
    return Object.values(this.players);
  }

  getCurrentPlayerId(): string {
    return this.currentPlayerId;
  }

  getCurrentPlayer(): AlkopolyPlayer {
    return this.players[this.currentPlayerId];
  }

  getGameStarted(): boolean {
    return this.gameStarted;
  }

  getTiles(): TileProps[] {
    return [...this.tiles];
  }

  getReward(): number {
    return this.reward;
  }
  // ----------------------------------------------

  // METODY
  addPlayer(id: string, player: AlkopolyPlayer): void {
    this.players = { ...this.players, [id]: player };
    if (Object.keys(this.players).length === 1) this.currentPlayerId = id;
  }

  renderBoard(): void {
    // Clear players from tiles
    this.tiles.forEach((tile) => {
      tile.players = [];
    });

    // Render players on tiles
    this.getPlayersArray().forEach((player) => {
      const tile = this.findTile(player.position);
      tile.players.push(player);
    });
  }

  // TODO: When multiplayer - check current player turn
  rollDice(diceResult: number): void {
    const currentPlayer = this.getCurrentPlayer();
    currentPlayer.rolled = true;
    currentPlayer.position += diceResult;

    if (currentPlayer.position > this.tiles.length) {
      const newPos = currentPlayer.position - this.tiles.length;
      currentPlayer.position = newPos;
      currentPlayer.money += BONUS_MONEY;
    }

    this.renderBoard();
    this.checkTile(currentPlayer);
  }

  startGame(): void {
    this.gameStarted = true;
    this.renderBoard();
  }

  nextTurn(): void {
    const currentPlayer = this.getCurrentPlayer();
    currentPlayer.rolled = false;

    const playerIds = Object.keys(this.players);
    if (playerIds.length === 0) return;

    const currentIndex = playerIds.indexOf(this.currentPlayerId);
    const nextIndex = (currentIndex + 1) % playerIds.length;

    this.currentPlayerId = playerIds[nextIndex];
  }

  // HELPERS
  findTile(id: number): TileProps {
    return this.tiles.find((t) => t.id === id)!;
  }

  checkTile(player: AlkopolyPlayer): void {
    const tile = this.findTile(player.position);

    switch (tile.type) {
      case "property":
        if (tile.owner && tile.tax) player.payTax(tile.tax, tile.owner);
        break;
      case "fine":
        if (!tile.tax) return;
        player.payTax(tile.tax);
        this.reward += tile.tax;
        break;
      case "reward":
        player.money += this.reward;
        this.reward = 0;
        break;
      case "chance":
        // zrobic klase chancecard
        break;
      default:
        break;
    }
  }
}
