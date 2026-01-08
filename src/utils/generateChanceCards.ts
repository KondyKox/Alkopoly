import chanceCardData from "../data/chance_cards.json";
import {
  type ChanceCardEffect,
  type ChanceCardProps,
  CHANCE_CARD_EFFECTS,
} from "../types/ChanceCardProps";
import type { AlkopolyPlayer } from "../types/PlayerProps";

type EffectHandler = (player: AlkopolyPlayer, cardName?: string) => void;

export const generateChanceCards = (
  effectsMap: Record<ChanceCardEffect, EffectHandler>
): ChanceCardProps[] => {
  return chanceCardData.map((raw: any): ChanceCardProps => {
    const effect = raw.effect as ChanceCardEffect;

    if (!CHANCE_CARD_EFFECTS.includes(effect)) {
      console.warn(`Nieznany efekt: ${effect}`);
    }

    const execute =
      effectsMap[effect] ??
      (() => console.warn(`Brak implementacji dla ${effect}!`));

    return {
      id: raw.id,
      name: raw.name,
      text: raw.text,
      action: raw.action,
      effect,
      imageSrc: raw.imageSrc,
      execute,
    };
  });
};
