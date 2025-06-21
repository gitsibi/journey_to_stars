import React from 'react';
import { Package, Fuel, Apple, Droplet, Heart, Wrench } from 'lucide-react';
import { GameItem } from '../types/game';

interface CargoContainerProps {
  id: number;
  item: GameItem | null;
  onClick?: () => void;
  isHighlighted?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const getItemIcon = (item: GameItem | null) => {
  switch (item) {
    case 'Fuel':
      return <Fuel className="text-red-400" size={24} />;
    case 'Food & Ration':
      return <Apple className="text-green-400" size={24} />;
    case 'Water':
      return <Droplet className="text-blue-400" size={24} />;
    case 'Medical Supplies':
      return <Heart className="text-pink-400" size={24} />;
    case 'Tools & Equipment':
      return <Wrench className="text-yellow-400" size={24} />;
    default:
      return <Package className="text-slate-500" size={24} />;
  }
};

const getItemColor = (item: GameItem | null) => {
  switch (item) {
    case 'Fuel':
      return 'from-red-500/20 to-red-600/20 border-red-500/50';
    case 'Food & Ration':
      return 'from-green-500/20 to-green-600/20 border-green-500/50';
    case 'Water':
      return 'from-blue-500/20 to-blue-600/20 border-blue-500/50';
    case 'Medical Supplies':
      return 'from-pink-500/20 to-pink-600/20 border-pink-500/50';
    case 'Tools & Equipment':
      return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/50';
    default:
      return 'from-slate-600/20 to-slate-700/20 border-slate-600/50';
  }
};

export const CargoContainer: React.FC<CargoContainerProps> = ({
  id,
  item,
  onClick,
  isHighlighted = false,
  size = 'medium'
}) => {
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  return (
    <div 
      className={`
        relative bg-gradient-to-br ${getItemColor(item)} 
        rounded-xl border-2 transition-all duration-300 
        ${sizeClasses[size]}
        ${onClick ? 'cursor-pointer hover:scale-105 hover:shadow-lg' : ''}
        ${isHighlighted ? 'ring-2 ring-blue-400 shadow-lg shadow-blue-400/25' : ''}
        flex flex-col items-center justify-center
      `}
      onClick={onClick}
    >
      {/* Container Number */}
      <div className="absolute -top-2 -left-2 w-6 h-6 bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center text-xs text-white font-bold">
        {id}
      </div>

      {/* Item Icon */}
      <div className="mb-1">
        {getItemIcon(item)}
      </div>

      {/* Item Name */}
      <div className="text-xs text-center text-white font-medium px-1 leading-tight">
        {item || 'Empty'}
      </div>

      {/* Glow effect for highlighted containers */}
      {isHighlighted && (
        <div className="absolute inset-0 bg-blue-400/10 rounded-xl animate-pulse"></div>
      )}
    </div>
  );
};