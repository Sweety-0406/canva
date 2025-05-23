import React from 'react';

interface GradientPreviewProps {
  gradients: {
    id: number;
    type: string;
    colors: string[];
    angle?: number; 
  }[];
  onSelect: (id: number) => void;
  selectedId: number;
}

const GradientPreview: React.FC<GradientPreviewProps> = ({ gradients, selectedId, onSelect }) => {
  const generateGradientCSS = (g: typeof gradients[0]) => {
    if (g.type === 'linear') {
      return `linear-gradient(${(g.angle ?? 90)-180}deg, ${g.colors.join(', ')})`;
    } else {
      return `radial-gradient(circle, ${g.colors.join(', ')})`;
    }
  };

  return (
    <div className="flex gap-3 justify-between">
      {gradients.map((gradient) => (
        <div
          key={gradient.id}
          className={`
            group flex justify-center items-center rounded-xl cursor-pointer w-[45px]  h-[45px] overflow-hidden hover:border-2 hover:border-gray-300
            ${gradient.id === selectedId ? 'border-2 border-purple-500' : 'border-transparent'}
          `}
        >
          <div
            onClick={() => onSelect(gradient.id)}
            className="w-10 h-10 transform group-hover:scale-90  transition-all duration-200 rounded-lg"
            style={{
              background: generateGradientCSS(gradient),
            }}
          />
        </div>

      ))}
    </div>
  );
};

export default GradientPreview;
