import React, { useState, useEffect } from 'react';
import { Package, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react';
import { CargoContainer } from './CargoContainer';
import { ArrayVisualization } from './ArrayVisualization';
import { GAME_ITEMS } from '../types/game';
import type { CargoContainer as CargoContainerType, GameItem } from '../types/game';

interface Mission1Props {
  containers: CargoContainerType[];
  onInitializeContainers: (count: number) => void;
  onPlaceItemInContainer: (containerId: number, item: GameItem) => void;
  onRemoveItemFromContainer: (containerId: number) => void;
  onUpdateContainers: (containers: CargoContainerType[]) => void;
  onRandomlyPlaceItems: () => void;
  onCompleteMission: () => void;
}

export const Mission1: React.FC<Mission1Props> = ({
  containers,
  onInitializeContainers,
  onPlaceItemInContainer,
  onRemoveItemFromContainer,
  onUpdateContainers,
  onRandomlyPlaceItems,
  onCompleteMission
}) => {
  const [containerCount, setContainerCount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [step, setStep] = useState<'setup' | 'placement' | 'complete'>('setup');
  const [draggedItem, setDraggedItem] = useState<GameItem | null>(null);
  const [availableItems, setAvailableItems] = useState<GameItem[]>([]);

  // Update available items when containers change
  useEffect(() => {
    if (containers.length > 0) {
      const placedItems = containers.filter(c => c.item !== null).map(c => c.item!);
      const remaining = GAME_ITEMS.filter(item => !placedItems.includes(item));
      setAvailableItems(remaining);
    }
  }, [containers]);

  const handleInitialize = () => {
    const count = parseInt(containerCount);
    if (isNaN(count) || count <= 0) {
      setError('Please enter a valid positive number!');
      return;
    }

    if (count < GAME_ITEMS.length) {
      setError(`You need at least ${GAME_ITEMS.length} containers to store all items!`);
      return;
    }

    try {
      onInitializeContainers(count);
      setAvailableItems([...GAME_ITEMS]);
      setStep('placement');
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleDragStart = (item: GameItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, containerId: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    // Check if container is already occupied
    const container = containers.find(c => c.id === containerId);
    if (container?.item) {
      setError(`Container ${containerId} already contains ${container.item}!`);
      setTimeout(() => setError(''), 3000);
      setDraggedItem(null);
      return;
    }

    // Place item in container
    onPlaceItemInContainer(containerId, draggedItem);
    setDraggedItem(null);
    setError('');
  };

  const handleRemoveItem = (containerId: number) => {
    const container = containers.find(c => c.id === containerId);
    if (!container?.item) return;

    onRemoveItemFromContainer(containerId);
  };

  const handleAutoPlace = () => {
    const shuffledItems = [...availableItems].sort(() => Math.random() - 0.5);
    const emptyContainers = containers.filter(c => c.item === null);
    
    const updatedContainers = [...containers];
    shuffledItems.forEach((item, index) => {
      if (index < emptyContainers.length) {
        const containerId = emptyContainers[index].id;
        const containerIndex = updatedContainers.findIndex(c => c.id === containerId);
        updatedContainers[containerIndex] = { ...updatedContainers[containerIndex], item };
      }
    });

    onUpdateContainers(updatedContainers);
  };

  const handleReset = () => {
    const resetContainers = containers.map(c => ({ ...c, item: null }));
    onUpdateContainers(resetContainers);
  };

  const allItemsPlaced = availableItems.length === 0 && containers.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Mission Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Mission 1: Cargo Bay Setup</h1>
          <p className="text-xl text-slate-300">Array Initialization & Declaration</p>
        </div>

        {/* Mission Brief */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-slate-700/50">
          <div className="flex items-start gap-4">
            <Package className="text-blue-400 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-white font-semibold mb-2">Mission Briefing</h3>
              <p className="text-slate-300 mb-4">
                The starship is ready for departure, but first we need to set up the cargo bay. 
                You must decide how many containers to prepare and then load all essential supplies by dragging and dropping them into containers:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {GAME_ITEMS.map((item, index) => (
                  <div key={index} className="bg-slate-700/30 rounded-lg p-2 text-center text-sm text-slate-300">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Step 1: Container Setup */}
        {step === 'setup' && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-slate-700/50">
            <h3 className="text-white font-semibold mb-4">Step 1: Decide Container Count</h3>
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-slate-300 mb-2">
                  How many containers do you want to prepare?
                </label>
                <input
                  type="number"
                  min="1"
                  value={containerCount}
                  onChange={(e) => setContainerCount(e.target.value)}
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter number of containers..."
                />
                <p className="text-slate-400 text-sm mt-1">
                  Minimum required: {GAME_ITEMS.length} containers
                </p>
              </div>
              <button
                onClick={handleInitialize}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Initialize Cargo Bay
              </button>
            </div>
            {error && (
              <div className="mt-4 flex items-center gap-2 text-red-400">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Item Placement */}
        {step === 'placement' && containers.length > 0 && (
          <div className="space-y-6">
            {/* Available Items */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-white font-semibold mb-4">Available Items to Load</h3>
              <p className="text-slate-300 mb-4">
                Drag and drop items from here into the cargo containers below:
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {availableItems.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    draggable
                    onDragStart={() => handleDragStart(item)}
                    className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/50 rounded-xl p-4 cursor-grab active:cursor-grabbing hover:scale-105 transition-all duration-200 min-w-[140px] text-center"
                  >
                    <div className="text-white font-medium text-sm">{item}</div>
                  </div>
                ))}
              </div>
              
              {availableItems.length === 0 && (
                <div className="text-center text-green-400 font-semibold">
                  All items have been loaded! 🎉
                </div>
              )}

              {/* Helper Buttons */}
              <div className="flex gap-4 justify-center mt-6">
                <button
                  onClick={handleAutoPlace}
                  disabled={availableItems.length === 0}
                  className="bg-purple-500 hover:bg-purple-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Auto-Place Remaining
                </button>
                <button
                  onClick={handleReset}
                  className="bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm flex items-center gap-2"
                >
                  <RotateCcw size={16} />
                  Reset All
                </button>
              </div>
            </div>

            {/* Container Grid */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <h3 className="text-white font-semibold mb-4">Cargo Bay Layout</h3>
              <p className="text-slate-300 mb-4 text-sm">
                Drop items into containers or click on filled containers to remove items:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 justify-items-center">
                {containers.map((container) => (
                  <div
                    key={container.id}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, container.id)}
                    className="relative"
                  >
                    <CargoContainer
                      id={container.id}
                      item={container.item}
                      onClick={container.item ? () => handleRemoveItem(container.id) : undefined}
                    />
                    {/* Drop zone indicator */}
                    {!container.item && draggedItem && (
                      <div className="absolute inset-0 border-2 border-dashed border-blue-400 rounded-xl bg-blue-400/10 animate-pulse pointer-events-none"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Array Visualization */}
            <ArrayVisualization 
              containers={containers} 
              title="Cargo Bay Array Representation"
            />

            {/* Error Display */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-center gap-2 text-red-200">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            {/* Complete Mission Button */}
            {allItemsPlaced && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-6 text-center">
                <CheckCircle className="text-green-400 mx-auto mb-4" size={48} />
                <h3 className="text-white font-semibold text-xl mb-2">All Items Loaded!</h3>
                <p className="text-green-200 mb-4">
                  Excellent work! You've successfully loaded all essential supplies into the cargo bay. 
                  The array is now fully initialized and ready for the journey.
                </p>
                <button
                  onClick={onCompleteMission}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  Complete Mission 1
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};