import { useState, useCallback } from 'react';
import { GameState, GamePhase, CargoContainer, GameItem, GAME_ITEMS } from '../types/game';

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'intro',
    containers: [],
    containerCount: 0,
    currentMission: 1,
    score: 0,
    completedMissions: []
  });

  const startGame = useCallback(() => {
    setGameState(prev => ({ ...prev, phase: 'mission1' }));
  }, []);

  const initializeContainers = useCallback((count: number) => {
    if (count < GAME_ITEMS.length) {
      throw new Error(`You need at least ${GAME_ITEMS.length} containers to store all items!`);
    }

    const containers: CargoContainer[] = Array(count).fill(null).map((_, index) => ({
      id: index + 1,
      item: null
    }));

    setGameState(prev => ({
      ...prev,
      containers,
      containerCount: count
    }));
  }, []);

  const placeItemInContainer = useCallback((containerId: number, item: GameItem) => {
    setGameState(prev => ({
      ...prev,
      containers: prev.containers.map(container =>
        container.id === containerId
          ? { ...container, item }
          : container
      )
    }));
  }, []);

  const removeItemFromContainer = useCallback((containerId: number) => {
    setGameState(prev => ({
      ...prev,
      containers: prev.containers.map(container =>
        container.id === containerId
          ? { ...container, item: null }
          : container
      )
    }));
  }, []);

  const updateContainers = useCallback((containers: CargoContainer[]) => {
    setGameState(prev => ({
      ...prev,
      containers
    }));
  }, []);

  const randomlyPlaceItems = useCallback(() => {
    setGameState(prev => {
      const availableContainers = [...prev.containers];
      const shuffledItems = [...GAME_ITEMS].sort(() => Math.random() - 0.5);
      
      shuffledItems.forEach(item => {
        const emptyContainers = availableContainers.filter(c => c.item === null);
        if (emptyContainers.length > 0) {
          const randomIndex = Math.floor(Math.random() * emptyContainers.length);
          const selectedContainer = emptyContainers[randomIndex];
          selectedContainer.item = item;
        }
      });

      return {
        ...prev,
        containers: availableContainers
      };
    });
  }, []);

  const searchForItem = useCallback((item: GameItem): number | null => {
    const container = gameState.containers.find(c => c.item === item);
    return container ? container.id : null;
  }, [gameState.containers]);

  const completeMission = useCallback((missionNumber: number) => {
    setGameState(prev => ({
      ...prev,
      completedMissions: [...prev.completedMissions, missionNumber],
      score: prev.score + 100,
      phase: missionNumber === 1 ? 'mission2' : 'complete',
      currentMission: missionNumber + 1
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState({
      phase: 'intro',
      containers: [],
      containerCount: 0,
      currentMission: 1,
      score: 0,
      completedMissions: []
    });
  }, []);

  return {
    gameState,
    startGame,
    initializeContainers,
    placeItemInContainer,
    removeItemFromContainer,
    updateContainers,
    randomlyPlaceItems,
    searchForItem,
    completeMission,
    resetGame
  };
};