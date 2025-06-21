import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, Zap, Trash2, ArrowUpDown } from 'lucide-react';
import { CargoContainer } from './CargoContainer';
import { ArrayVisualization } from './ArrayVisualization';
import type { CargoContainer as CargoContainerType } from '../types/game';

interface Mission2Props {
  containers: CargoContainerType[];
  onSearchForItem: (item: string) => number | null;
  onCompleteMission: () => void;
}

export const Mission2: React.FC<Mission2Props> = ({
  containers,
  onSearchForItem,
  onCompleteMission
}) => {
  const [selectedOperation, setSelectedOperation] = useState<string>('');
  const [containerGuess, setContainerGuess] = useState<string>('');
  const [searchResult, setSearchResult] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [missionComplete, setMissionComplete] = useState(false);

  const operations = [
    { id: 'search', name: 'search_item()', icon: Search, description: 'Find item location' },
    { id: 'delete', name: 'delete_item()', icon: Trash2, description: 'Remove item from array' },
    { id: 'sort', name: 'sort_items()', icon: ArrowUpDown, description: 'Sort array elements' }
  ];

  const handleOperationSelect = (operationId: string) => {
    setSelectedOperation(operationId);
    setMessage('');
    setContainerGuess('');
    
    if (operationId !== 'search') {
      setMessage('Wrong operation! You need to search for the Tools & Equipment first.');
      setMessageType('error');
      return;
    }
    
    setMessage('Good choice! Now enter the container number that contains Tools & Equipment.');
    setMessageType('info');
  };

  const handleContainerSubmit = () => {
    if (!selectedOperation) {
      setMessage('Please select an operation first!');
      setMessageType('error');
      return;
    }

    if (selectedOperation !== 'search') {
      setMessage('Wrong operation selected! Use search_item() to find the Tools & Equipment.');
      setMessageType('error');
      return;
    }

    const guess = parseInt(containerGuess);
    if (isNaN(guess) || guess <= 0) {
      setMessage('Please enter a valid container number!');
      setMessageType('error');
      return;
    }

    // Find the actual container with Tools & Equipment
    const actualContainer = onSearchForItem('Tools & Equipment');
    
    if (guess === actualContainer) {
      setMessage('Excellent! You found the Tools & Equipment! The engineering team can now repair the solar panels.');
      setMessageType('success');
      setSearchResult(actualContainer);
      setMissionComplete(true);
    } else {
      setMessage(`Incorrect! Container ${guess} ${containers[guess - 1]?.item ? `contains ${containers[guess - 1].item}` : 'is empty'}. Try again!`);
      setMessageType('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Mission Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Mission 2: Emergency Repair</h1>
          <p className="text-xl text-slate-300">Array Search Operations</p>
        </div>

        {/* Mission Brief */}
        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-red-400 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-white font-semibold mb-2">EMERGENCY ALERT</h3>
              <p className="text-red-200 mb-2">
                The starship's solar panels have suffered minor damage! The engineering team needs 
                <span className="font-bold text-yellow-300"> Tools & Equipment</span> immediately to perform repairs.
              </p>
              <p className="text-red-200">
                As Cargo Manager, you must quickly locate the container with the required items using array operations.
              </p>
            </div>
          </div>
        </div>

        {/* Current Cargo Bay Status */}
        <div className="space-y-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <h3 className="text-white font-semibold mb-4">Current Cargo Bay Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 justify-items-center">
              {containers.map((container) => (
                <CargoContainer
                  key={container.id}
                  id={container.id}
                  item={container.item}
                  isHighlighted={searchResult === container.id}
                />
              ))}
            </div>
          </div>

          <ArrayVisualization 
            containers={containers} 
            title="Cargo Bay Array - Find Tools & Equipment"
          />
        </div>

        {/* Operations Panel */}
        {!missionComplete && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-slate-700/50">
            <h3 className="text-white font-semibold mb-4">Array Operations Panel</h3>
            <p className="text-slate-300 mb-4">
              Select the correct operation to find the Tools & Equipment:
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {operations.map((op) => (
                <button
                  key={op.id}
                  onClick={() => handleOperationSelect(op.id)}
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-200 text-left
                    ${selectedOperation === op.id 
                      ? 'bg-blue-500/20 border-blue-400 text-blue-200' 
                      : 'bg-slate-700/30 border-slate-600 text-slate-300 hover:border-slate-500'
                    }
                  `}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <op.icon size={20} />
                    <span className="font-mono font-semibold">{op.name}</span>
                  </div>
                  <p className="text-sm opacity-80">{op.description}</p>
                </button>
              ))}
            </div>

            {selectedOperation === 'search' && (
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-slate-300 mb-2">
                    Enter container number containing Tools & Equipment:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={containers.length}
                    value={containerGuess}
                    onChange={(e) => setContainerGuess(e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={`Enter number (1-${containers.length})`}
                  />
                </div>
                <button
                  onClick={handleContainerSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Search size={16} />
                  Search
                </button>
              </div>
            )}

            {message && (
              <div className={`
                mt-4 p-4 rounded-lg flex items-center gap-2
                ${messageType === 'success' ? 'bg-green-500/20 border border-green-500/50 text-green-200' :
                  messageType === 'error' ? 'bg-red-500/20 border border-red-500/50 text-red-200' :
                  'bg-blue-500/20 border border-blue-500/50 text-blue-200'}
              `}>
                {messageType === 'success' && <CheckCircle size={16} />}
                {messageType === 'error' && <AlertTriangle size={16} />}
                {messageType === 'info' && <Zap size={16} />}
                <span>{message}</span>
              </div>
            )}
          </div>
        )}

        {/* Mission Complete */}
        {missionComplete && (
          <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-6 text-center">
            <CheckCircle className="text-green-400 mx-auto mb-4" size={48} />
            <h3 className="text-white font-semibold text-xl mb-2">Mission 2 Complete!</h3>
            <p className="text-green-200 mb-4">
              Outstanding work, Cargo Manager! You successfully used array search operations to locate 
              the Tools & Equipment in container {searchResult}. The engineering team can now repair 
              the solar panels and ensure our continued journey through space!
            </p>
            <button
              onClick={onCompleteMission}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Complete Journey
            </button>
          </div>
        )}
      </div>
    </div>
  );
};