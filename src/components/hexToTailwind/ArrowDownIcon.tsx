import { ArrowDown } from 'lucide-react';
import { memo } from 'react';

const ArrowDownIcon = memo(() => (
  <div className="text-ui flex justify-center">
    <ArrowDown size={24} className="animate-bounce" />
  </div>
));

ArrowDownIcon.displayName = 'ArrowDownIcon';
export default ArrowDownIcon;
