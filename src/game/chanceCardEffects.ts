import type { ChanceCardEffect } from "../types/ChanceCardProps";
import type { AlkopolyPlayer } from "../types/PlayerProps";
import type GameStateManager from "./gameState";

type EffectHandler = (player: AlkopolyPlayer, cardName?: string) => void;

// Surowa mapa fabryk – zostaje prywatna
const rawEffectFactories: Record<
  ChanceCardEffect,
  (gameState: GameStateManager) => EffectHandler
> = {
  zestaw_deluxe: (gameState) => (player) => {
    const COST = 100;
    player.money -= COST;
    gameState.reward += COST;

    // TODO: zrobic metode movePlayer
  },
  ziolo: (gameState) => (player) => {},
  tj_tatoo: (gameState) => (player) => {},
  polwidoczny: (gameState) => (player) => {},
  kd: (gameState) => (player) => {},
  kilof: (gameState) => (player) => {},
  vodka: (gameState) => (player) => {},
  emotes: (gameState) => (player) => {},
  zgon: (gameState) => (player) => {},
  gift: (gameState) => (player) => {},
  scam_and_run: (gameState) => (player) => {},
  wiadro: (gameState) => (player) => {},
  wyplata: (gameState) => (player) => {},
  rudy_chuj: (gameState) => (player) => {},
  sigma: (gameState) => (player) => {},
  main_event: (gameState) => (player) => {},
  alkoholizm: (gameState) => (player) => {},
  tankowanie: (gameState) => (player) => {},
  malzenstwo: (gameState) => (player) => {},
  polowka: (gameState) => (player) => {},
  sniper: (gameState) => (player) => {},
  no_i_chuj: (gameState) => (player) => {},
  dzidek: (gameState) => (player) => {},
  deutchland: (gameState) => (player) => {},
  movement_malpy: (gameState) => (player) => {},
};

// <<< WAŻNE >>> Eksportujemy TYLKO funkcję tworzącą gotowe efekty!
export const createChanceCardEffects = (
  gameState: GameStateManager
): Record<ChanceCardEffect, EffectHandler> => {
  const effects: Partial<Record<ChanceCardEffect, EffectHandler>> = {};

  (Object.keys(rawEffectFactories) as ChanceCardEffect[]).forEach((key) => {
    effects[key] = rawEffectFactories[key](gameState);
  });

  return effects as Record<ChanceCardEffect, EffectHandler>;
};
