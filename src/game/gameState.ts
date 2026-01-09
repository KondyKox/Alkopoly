import type { ChanceCardProps } from "../types/ChanceCardProps";
import type { AlkopolyPlayer } from "../types/PlayerProps";
import type { TileProps } from "../types/TileProps";
import { generateChanceCards } from "../utils/generateChanceCards";
import { generateTiles } from "../utils/generateTiles";
import { createChanceCardEffects } from "./chanceCardEffects";

export default class GameStateManager {
  private players: Record<string, AlkopolyPlayer> = {};
  private currentPlayerId: string = "";
  private gameStarted: boolean = false;
  public readonly tiles: TileProps[] = [];
  public reward: number = 0;
  private currentTileToShowId: number | null = null;
  private chanceCards: ChanceCardProps[] = [];
  private chanceCardToShow: ChanceCardProps | null = null;

  constructor() {
    const effectsMap = createChanceCardEffects(this);
    this.chanceCards = generateChanceCards(effectsMap);
    this.tiles = generateTiles();
  }

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

  getCurrentTileToShowId(): number | null {
    return this.currentTileToShowId;
  }

  getChanceCardToShow(): ChanceCardProps | null {
    return this.chanceCardToShow;
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
    currentPlayer.move(diceResult, this);
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

  goToJail(player: AlkopolyPlayer): void {
    if (player.no_i_chuj) {
      player.no_i_chuj = false;
      alert(`No i chuj, ${player.name} unika Izby Wytrzeźwień.`);
      return;
    }

    player.jailed = true;
    player.position = this.findPrison();
    this.renderBoard();
  }

  getMoneyFromPlayers(player: AlkopolyPlayer, moneyAmount: number): void {
    let money = 0;

    this.getPlayersArray().forEach((p) => {
      if (p.id !== player.id) {
        player.payTax(moneyAmount);
        money += moneyAmount;
      }
    });

    player.money += money;
  }

  mariage(player: AlkopolyPlayer): void {
    const players = this.getPlayersArray().filter((p) => p.id !== player.id);
    const randomIndex = Math.floor(Math.random() * players.length) + 1;

    const wife = players[randomIndex];
    const toPay = player.money / 20;

    player.payTax(toPay, wife);
    alert(`${player.name} żeni się z ${wife.name} i płaci 20% pieniędzy.`);
  }

  // HELPERS
  findTile(id: number): TileProps {
    return this.tiles.find((t) => t.id === id)!;
  }

  findZioloTile(): number {
    const tile = this.tiles.find((t) => t.name === "Zakup zioła");
    if (!tile) {
      console.warn("Brak pola 'Zakup zioła'.");
      return 1; // fallback na start, żeby nie crash
    }
    return tile.id;
  }

  findVodkaTile(): number {
    const tile = this.tiles.find((t) => t.name === "Zakup alkoholu");
    if (!tile) {
      console.warn("Brak pola 'Zakup alkoholu'.");
      return 1;
    }
    return tile.id;
  }

  findStart(): number {
    const startTile = this.tiles.find((t) => t.type === "start");

    if (!startTile) {
      console.warn("Brak pola 'start' na planszy. Fallback na pole 1.");
      return 1; // fallback na pierwsze pole – gra nie crashuje
    }

    return startTile.id;
  }

  findPrison(): number {
    return this.tiles.find((t) => t.type === "jail")!.id;
  }

  findRewardTile(): number {
    return this.tiles.find((t) => t.type === "reward")!.id;
  }

  findTarnowJezierny(): number {
    return this.findTile(this.tiles.length)!.id;
  }

  checkTile(player: AlkopolyPlayer): void {
    const tile = this.findTile(player.position);
    this.currentTileToShowId = tile.id;

    switch (tile.type) {
      case "property":
        if (tile.owner) {
          const tax =
            "getTotalTax" in tile && typeof tile.getTotalTax === "function"
              ? (tile as any).getTotalTax()
              : tile.tax || 0;
          player.payTax(tax, tile.owner);
        }
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
        const randomId = Math.floor(Math.random() * this.chanceCards.length);
        const randomCard = this.chanceCards[randomId];
        this.chanceCardToShow = randomCard;
        setTimeout(() => randomCard.execute(player, randomCard.name), 1000);
        break;
      default:
        break;
    }
  }

  clearCurrentTileToShow(): void {
    this.currentTileToShowId = null;
  }

  clearChanceCardToShow(): void {
    this.chanceCardToShow = null;
  }
}
