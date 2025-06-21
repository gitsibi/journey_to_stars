import React from 'react';
import { CargoContainer } from '../types/game';

interface ArrayVisualizationProps {
  containers: CargoContainer[];
  title?: string;
}

export const ArrayVisualization: React.FC<ArrayVisualizationProps> = ({ 
  containers, 
  title = "Array Representation" 
}) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <h3 className="text-white font-semibold mb-4 text-center">{title}</h3>
      
      {/* Array Brackets and Elements */}
      <div className="flex items-center justify-center flex-wrap gap-1 font-mono text-sm">
        <span className="text-yellow-400 text-xl font-bold">[</span>
        {containers.map((container, index) => (
          <React.Fragment key={container.id}>
            <div className="bg-slate-700/50 rounded px-3 py-2 min-w-[120px] text-center border border-slate-600/50">
              <div className="text-blue-400 text-xs mb-1">Index {index}</div>
              <div className="text-white font-medium">
                {container.item || 'empty'}
              </div>
            </div>
            {index < containers.length - 1 && (
              <span className="text-slate-400 mx-1">,</span>
            )}
          </React.Fragment>
        ))}
        <span className="text-yellow-400 text-xl font-bold">]</span>
      </div>

      {/* Array Info */}
      <div className="mt-4 text-center text-slate-400 text-sm">
        Length: <span className="text-white font-semibold">{containers.length}</span>
      </div>
    </div>
  );
};