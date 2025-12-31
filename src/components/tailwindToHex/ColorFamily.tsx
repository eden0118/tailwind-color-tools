import { memo } from 'react';
import { TailwindColor } from '@/types';

interface ColorFamilyProps {
  name: string;
  colors: TailwindColor[];
  onSelectColor: (colorClass: string) => void;
}

const ColorFamily = memo<ColorFamilyProps>(({ name, colors, onSelectColor }) => (
  <div className="hover:border-border rounded-xl border border-slate-500 bg-gray-900 p-4 transition-colors">
    <h3 className="text-secondaryText mb-3 font-bold capitalize">{name}</h3>
    <div className="grid grid-cols-6 gap-2">
      {colors.map((c) => {
        const shade = c.class.split('-').pop();
        const isLight = ['50', '100', '200', '300', '400'].includes(shade || '');
        return (
          <button
            key={c.class}
            onClick={() => onSelectColor(c.class)}
            className="group relative flex aspect-square items-center justify-center rounded shadow-sm ring-1 ring-white/5 transition-all hover:z-10 hover:scale-110"
            style={{ backgroundColor: c.hex }}
            title={c.class}
          >
            <span
              className={`text-[10px] font-bold opacity-0 transition-opacity group-hover:opacity-100 ${
                isLight ? 'text-gray-900' : 'text-primaryText'
              }`}
            >
              {shade}
            </span>
          </button>
        );
      })}
    </div>
  </div>
));

ColorFamily.displayName = 'ColorFamily';
export default ColorFamily;
