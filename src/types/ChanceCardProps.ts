import type { AlkopolyPlayer } from "./PlayerProps";

export interface ChanceCardProps {
  id: number;
  name: string;
  text: string;
  action: string;
  effect: ChanceCardEffect;
  imageSrc: string;

  execute: (player: AlkopolyPlayer) => void;
}

// typ z efektami
export type ChanceCardEffect =
  | "zestaw_deluxe"
  | "ziolo"
  | "tj_tatoo"
  | "polwidoczny"
  | "kd"
  | "kilof"
  | "vodka"
  | "emotes"
  | "zgon"
  | "gift"
  | "scam_and_run"
  | "wiadro"
  | "wyplata"
  | "rudy_chuj"
  | "sigma"
  | "main_event"
  | "alkoholizm"
  | "tankowanie"
  | "malzenstwo"
  | "polowka"
  | "sniper"
  | "no_i_chuj"
  | "dzidek"
  | "deutchland"
  | "movement_malpy";

// tablica z tymi samymi efektami
export const CHANCE_CARD_EFFECTS = [
  "zestaw_deluxe",
  "ziolo",
  "tj_tatoo",
  "polwidoczny",
  "kd",
  "kilof",
  "vodka",
  "emotes",
  "zgon",
  "gift",
  "scam_and_run",
  "wiadro",
  "wyplata",
  "rudy_chuj",
  "sigma",
  "main_event",
  "alkoholizm",
  "tankowanie",
  "malzenstwo",
  "polowka",
  "sniper",
  "no_i_chuj",
  "dzidek",
  "deutchland",
  "movement_malpy",
] as const;
