import type { ChanceCardEffect } from "../types/ChanceCardProps";
import type { AlkopolyPlayer } from "../types/PlayerProps";
import type GameStateManager from "./gameState";

type EffectHandler = (player: AlkopolyPlayer, cardName?: string) => void;

// TODO: FIX THIS EFFECTS

// Surowa mapa fabryk – zostaje prywatna
const rawEffectFactories: Record<
  ChanceCardEffect,
  (gameState: GameStateManager) => EffectHandler
> = {
  zestaw_deluxe: (gameState) => (player) => {
    const COST = 100;
    const TO_MOVE = 4;

    player.payTax(COST);
    gameState.reward += COST;
    player.move(TO_MOVE, gameState.tiles.length);
  },
  ziolo: (gameState) => (player) => {
    const newPos = gameState.findZioloTile();
    player.position = newPos;
    gameState.checkTile(player);
  },
  tj_tatoo: (gameState) => (player) => {
    player.respect = true;
  },
  polwidoczny: (gameState) => (player) => {
    player.incognito = 3;
  },
  kd: (gameState) => (player) => {
    player.position = gameState.findStart();
    gameState.checkTile(player);
  },
  kilof: (gameState) => (player) => {
    player.kilof = true;
  },
  vodka: (gameState) => (player) => {
    player.position = gameState.findVodkaTile();
    gameState.checkTile(player);
  },
  emotes: (gameState) => (player) => {
    const moneyAmount = 20;
    gameState.getMoneyFromPlayers(player, moneyAmount);
    player.sober = 1;
  },
  zgon: (gameState) => (player) => {
    player.position = gameState.findPrison();
    player.jailed = true;
  },
  gift: (gameState) => (player) => {
    const moneyAmount = 50;
    gameState.getMoneyFromPlayers(player, moneyAmount);
  },
  scam_and_run: (gameState) => (player) => {
    player.money += 1_000_000;
    player.money -= 999000;
  },
  wiadro: (gameState) => (player) => {
    player.sober = 2;
  },
  wyplata: (gameState) => (player) => {
    player.position = gameState.findRewardTile();
    gameState.checkTile(player);
  },
  rudy_chuj: (gameState) => (player) => {
    player.rudyChuj();
  },
  sigma: (gameState) => (player) => {
    player.sigma = true;
  },
  main_event: (gameState) => (player) => {
    player.payTax(200);
    gameState.reward += 200;
  },
  alkoholizm: (gameState) => (player) => {
    const toPay = player.money / 10;
    player.payTax(toPay);
  },
  tankowanie: (gameState) => (player) => {
    const toPay = 51;
    player.payTax(toPay);
  },
  malzenstwo: (gameState) => (player) => {
    gameState.mariage(player);
  },
  polowka: (gameState) => (player) => {
    player.position = gameState.findTarnowJezierny();
    gameState.checkTile(player);
  },
  sniper: (gameState) => (player) => {
    player.sniper = 2;
  },
  no_i_chuj: (gameState) => (player) => {
    player.no_i_chuj = true;
  },
  dzidek: (gameState) => (player) => {
    console.log("Dzidek to słodziak. 😺😺😺");
  },
  deutchland: (gameState) => (player) => {
    const tileLenght = gameState.tiles.length;
    player.move(tileLenght, tileLenght);
  },
  movement_malpy: (gameState) => (player) => {
    player.monkey = 2;
  },
};

// <<< WAŻNE >>> Eksportujemy TYLKO funkcję tworzącą gotowe efekty!
export const createChanceCardEffects = (
  gameState: GameStateManager
): Record<ChanceCardEffect, EffectHandler> => {
  const effects: Partial<Record<ChanceCardEffect, EffectHandler>> = {};

  (Object.keys(rawEffectFactories) as ChanceCardEffect[]).forEach((key) => {
    const originalHandler = rawEffectFactories[key](gameState);

    // OWijamy KAŻDĄ funkcję – zawsze loguje nazwę karty na początku
    effects[key] = (player: AlkopolyPlayer, cardName?: string) => {
      console.log(`🃏 Odpalam kartę: "${cardName}" (efekt: ${key})`);
      // Potem wołamy oryginalną logikę
      originalHandler(player, cardName);
    };
  });

  return effects as Record<ChanceCardEffect, EffectHandler>;
};
