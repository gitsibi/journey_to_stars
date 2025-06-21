export type GameItem = 'Fuel' | 'Food & Ration' | 'Water' | 'Medical Supplies' | 'Tools & Equipment';

export interface CargoContainer {
  id: number;
  item: GameItem | null;
}

export type GamePhase = 'intro' | 'mission1' | 'mission2' | 'complete';

export interface GameState {
  phase: GamePhase;
  containers: CargoContainer[];
  containerCount: number;
  currentMission: number;
  score: number;
  completedMissions: number[];
}

export const GAME_ITEMS: GameItem[] = [
  'Fuel',
  'Food & Ration', 
  'Water',
  'Medical Supplies',
  'Tools & Equipment'
];