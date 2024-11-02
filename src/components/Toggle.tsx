import { cn } from '../lib/utils';
import { Switch } from '@headlessui/react';

interface ToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
}

export function Toggle({ checked, onCheckedChange, id }: ToggleProps) {
  return (
    <Switch
      checked={checked}
      onChange={onCheckedChange}
      id={id}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-gray-950',
        checked ? 'bg-gray-900' : 'bg-gray-200'
      )}
    >
      <span className="sr-only">Enable public humiliation</span>
      <span
        className={cn(
          'inline-block h-5 w-5 transform rounded-full bg-white transition-transform',
          checked ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </Switch>
  );
}