import React, { useRef, useState } from 'react';
import { ChromePicker } from 'react-color';
import GradientPreview from './gradientPreview';
import { Button } from '@/components/ui/button';
import Hint from './hint';


type GradientColorPickerProps = {
  gradientColor: string[],
  onChange: (colors: string[], type: string, angle: number) => void;
};

const GradientColorPicker: React.FC<GradientColorPickerProps> = ({ gradientColor, onChange }) => {
  const [colors, setColors] = useState<string[]>(gradientColor);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [newColor, setNewColor] = useState('#ffffff');
  const [gradientType, setGradientType] = useState('linear');
  const [angle, setAngle] = useState<number>(90);
  const [selectedId, setSelectedId] = useState(1);
  const gradients = [
    { id: 1, type: 'linear', angle: 90, colors: colors },
    { id: 2, type: 'linear', angle: 0, colors: colors },
    { id: 3, type: 'linear', angle: 45, colors: colors },
    { id: 4, type: 'radial', colors: colors },
    // { id: 5, type: 'radial', colors: colors },
  ];

  const handleSelect = (id: number) => {
  setSelectedId(id);
  const selected = gradients.find(g => g.id === id);
  if (selected) {
    setGradientType(selected.type);
    if (selected.type === 'linear') {
      setAngle(selected.angle ?? 90);
    }
  }
};


  const scrollRef = useRef<HTMLDivElement>(null);

  const addColor = () => {
    setColors([...colors, newColor]);
    setShowColorPicker(false);
  };

  const removeColor = (index: number) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  const handleApply = () => {
    onChange(colors, gradientType, angle);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-60 relative">
      <div className="relative flex items-center gap-2">
        {/* Scrollable area */}
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-2 overflow-x-auto flex-nowrap px- py-2  rounded w-full relative"
        >
          {colors.map((color, index) => (
            <div key={index} className="relative flex-shrink-0">
              <Hint label={color} side="bottom">
                <div
                  className="w-10 h-10 rounded-full border"
                  style={{ backgroundColor: color }}
                />
              </Hint>
              {colors.length > 2 && (
                <button 
                  className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
                  onClick={() => removeColor(index)}
                >
                  ×
                </button>
              )}
            </div>
          ))}

          {/* Add color button */}
          {colors.length<10 && (
            <div
            className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer bg-white flex-shrink-0"
            onClick={() => setShowColorPicker(true)}
            >
              <span className="text-xl">＋</span>
            </div>
          )}

          {colors.length>4 && (
            <div
              className="w-10 h-10 rounded-full  flex items-center justify-center  bg-white flex-shrink-0"
            />
          )}
        </div>
        {/* Tunnel white fade sides */}
        {colors.length>4 && ( 
          <div className="pointer-events-none absolute  top-0 bottom-0 w-10 bg-gradient-to-r from-white via-white to-transparent z-0" />
        )}
        {colors.length>4 && ( 
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white via-white to-transparent z-0" />
        )}
      </div>

      {/* Chrome Picker */}
      {showColorPicker && (
        <div className="relative z-10">
          <ChromePicker
            color={newColor}
            onChange={(color) => setNewColor(color.hex)}
          />
          
          <div className="mt-2 flex gap-2">
            <Button
              variant="purple"
              className="  px-6 py- rounded-md"
              onClick={addColor}
            >
              Add
            </Button>
            <Button
              onClick={() => setShowColorPicker(false)}
              variant='outline'
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="pb-4 ">
        <p className='text-xs text-gray-500 pb-2'>Style</p>
        <GradientPreview gradients={gradients} selectedId={selectedId} onSelect={handleSelect} />
      </div>

      {/* Apply button */}
      <Button
        variant="purple"
        onClick={handleApply}
        className="px-4 py-2 rounded "
        >
        Apply Gradient
      </Button>
    </div>
  );
};

export default GradientColorPicker;



{/* Gradient type selector */}
{/* <div className="flex gap-2 items-center">
  <label>Gradient Type:</label>
  <select
    value={gradientType}
    onChange={(e) => setGradientType(e.target.value as GradientType)}
    className="border px-2 py-1 rounded"
  >
    <option value="linear">Linear</option>
    <option value="radial">Radial</option>
  </select>
</div> */}

{/* Angle input */}
{/* {gradientType === 'linear' && (
  <div className="flex gap-2 items-center">
    <label>Angle:</label>
    <input
      type="number"
      value={angle}
      onChange={(e) => setAngle(parseInt(e.target.value))}
      className="border px-2 py-1 rounded w-20"
    />
  </div>
)} */}