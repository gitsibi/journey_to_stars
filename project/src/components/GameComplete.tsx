import React from 'react';
import { Trophy, Star, Rocket, RotateCcw } from 'lucide-react';

interface GameCompleteProps {
  score: number;
  onResetGame: () => void;
}

export const GameComplete: React.FC<GameCompleteProps> = ({ score, onResetGame }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Floating Stars Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <Star
              key={i}
              className="absolute text-yellow-300 animate-pulse"
              size={Math.random() * 20 + 8}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative z-10 bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Trophy className="text-yellow-400 animate-bounce" size={80} />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-ping"></div>
            </div>
          </div>

          <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
            Mission Accomplished!
          </h1>

          <div className="text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            <p className="mb-4">
              Congratulations, <span className="text-yellow-400 font-semibold">Master Cargo Manager</span>! 
              You have successfully completed your journey into the stars.
            </p>
            <p className="mb-4">
              Through your expert management of the cargo bay and mastery of array operations, 
              you ensured the safety and success of the entire crew's space journey.
            </p>
            <p>
              The starship has reached its destination safely, and your skills in array 
              initialization, manipulation, and search operations were instrumental in this success!
            </p>
          </div>

          {/* Score Display */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-6 mb-8 border border-blue-500/50">
            <h3 className="text-white font-semibold text-2xl mb-2">Final Score</h3>
            <div className="text-4xl font-bold text-yellow-400">{score} Points</div>
            <p className="text-slate-300 mt-2">Excellent performance across all missions!</p>
          </div>

          {/* Achievement Summary */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
              <div className="text-green-400 text-2xl font-bold mb-2">✓ Mission 1</div>
              <h4 className="text-white font-semibold mb-1">Array Initialization</h4>
              <p className="text-slate-400 text-sm">Successfully set up cargo bay and loaded all supplies</p>
            </div>
            <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
              <div className="text-green-400 text-2xl font-bold mb-2">✓ Mission 2</div>
              <h4 className="text-white font-semibold mb-1">Array Search</h4>
              <p className="text-slate-400 text-sm">Located critical supplies during emergency repair</p>
            </div>
          </div>

          {/* Skills Mastered */}
          <div className="bg-slate-700/30 rounded-xl p-6 mb-8 border border-slate-600/50">
            <h3 className="text-white font-semibold text-xl mb-4">Array Skills Mastered</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="text-blue-400 font-semibold">Declaration</div>
                <div className="text-slate-300">Array creation</div>
              </div>
              <div className="text-center">
                <div className="text-green-400 font-semibold">Initialization</div>
                <div className="text-slate-300">Setting array size</div>
              </div>
              <div className="text-center">
                <div className="text-purple-400 font-semibold">Assignment</div>
                <div className="text-slate-300">Adding elements</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 font-semibold">Search</div>
                <div className="text-slate-300">Finding elements</div>
              </div>
            </div>
          </div>

          <button
            onClick={onResetGame}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
          >
            <RotateCcw size={24} />
            Start New Journey
            <Rocket size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};