import React from 'react';
import { useGame } from './hooks/useGame';
import { GameIntro } from './components/GameIntro';
import { Mission1 } from './components/Mission1';
import { Mission2 } from './components/Mission2';
import { GameComplete } from './components/GameComplete';

function App() {
  const {
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
  } = useGame();

  const handleCompleteMission1 = () => {
    completeMission(1);
  };

  const handleCompleteMission2 = () => {
    completeMission(2);
  };

  switch (gameState.phase) {
    case 'intro':
      return <GameIntro onStartGame={startGame} />;
    
    case 'mission1':
      return (
        <Mission1
          containers={gameState.containers}
          onInitializeContainers={initializeContainers}
          onPlaceItemInContainer={placeItemInContainer}
          onRemoveItemFromContainer={removeItemFromContainer}
          onUpdateContainers={updateContainers}
          onRandomlyPlaceItems={randomlyPlaceItems}
          onCompleteMission={handleCompleteMission1}
        />
      );
    
    case 'mission2':
      return (
        <Mission2
          containers={gameState.containers}
          onSearchForItem={searchForItem}
          onCompleteMission={handleCompleteMission2}
        />
      );
    
    case 'complete':
      return (
        <GameComplete
          score={gameState.score}
          onResetGame={resetGame}
        />
      );
    
    default:
      return <GameIntro onStartGame={startGame} />;
  }
}

export default App;