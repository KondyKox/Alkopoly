import type { AlkopolyPlayer } from "./GameState";
import type { TileProps } from "./TileProps";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface JoinModalProps {
  joined: boolean;
  setJoined: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface LobbyProps {
  joined: boolean; // display lobby when joined
  players: AlkopolyPlayer[];
  gameStarted: boolean;
}

export interface TileModalProps extends Omit<ModalProps, "children"> {
  tile: TileProps;
}
