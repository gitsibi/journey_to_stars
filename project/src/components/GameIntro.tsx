import React from 'react';
import { Rocket, Star, Users, Package } from 'lucide-react';

interface GameIntroProps {
  onStartGame: () => void;
}

export const GameIntro: React.FC<GameIntroProps> = ({ onStartGame }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Floating Stars Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <Star
              key={i}
              className="absolute text-yellow-300 animate-pulse"
              size={Math.random() * 16 + 8}
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
              <Rocket className="text-blue-400 animate-bounce" size={80} />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
          </div>

          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
            Journey into the Stars
          </h1>

          <div className="text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            <p className="mb-4">
              Welcome, future <span className="text-yellow-400 font-semibold">Cargo Manager</span>! 
              You are about to embark on an epic space journey with hundreds of crew members aboard our advanced starship.
            </p>
            <p className="mb-4">
              Your critical mission: manage the cargo bay and ensure all essential supplies are properly organized 
              using the ship's <span className="text-blue-400 font-semibold">Array-based storage system</span>.
            </p>
            <p>
              Master the art of array operations as you navigate through challenging scenarios 
              that will test your organizational skills and save the mission!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
              <Users className="text-green-400 mx-auto mb-2" size={32} />
              <h3 className="text-white font-semibold mb-1">Crew Safety</h3>
              <p className="text-slate-400 text-sm">Ensure all crew members have the supplies they need</p>
            </div>
            <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
              <Package className="text-purple-400 mx-auto mb-2" size={32} />
              <h3 className="text-white font-semibold mb-1">Cargo Organization</h3>
              <p className="text-slate-400 text-sm">Master array operations through hands-on missions</p>
            </div>
            <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
              <Star className="text-yellow-400 mx-auto mb-2" size={32} />
              <h3 className="text-white font-semibold mb-1">Mission Success</h3>
              <p className="text-slate-400 text-sm">Complete objectives to ensure journey success</p>
            </div>
          </div>

          <button
            onClick={onStartGame}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Begin Your Journey
            <Rocket className="inline-block ml-2" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};