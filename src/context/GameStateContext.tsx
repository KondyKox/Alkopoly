import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import GameStateManager from "../game/gameState";

const gameManager = new GameStateManager();

interface GameContextType {
  game: GameStateManager;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [tick, setTick] = useState(0);

  // Ten mały efekt to cała magia – co 300ms sprawdzamy, czy coś się zmieniło
  // Nie jest to idealne (ale działa i jest proste)
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <GameContext.Provider value={{ game: gameManager }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider!");
  return ctx.game;
};
