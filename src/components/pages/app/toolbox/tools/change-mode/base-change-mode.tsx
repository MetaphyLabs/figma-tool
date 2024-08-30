import { useMode } from '@/client/store/mode.store';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { MoonStar, SquareAsterisk, SquareMinus, Sun } from 'lucide-react';
import React from 'react';

const modes = [
  {
    value: 'difference',
    Icon: SquareMinus,
    tooltip: 'Difference',
  },
  {
    value: 'lighten',
    Icon: Sun,
    tooltip: 'Lighten',
  },
  {
    value: 'darken',
    Icon: MoonStar,
    tooltip: 'Darken',
  },
  {
    value: 'multiply',
    Icon: SquareAsterisk,
    tooltip: 'Multiply',
  },
] as const;

export function Modes() {
  const mode = useMode((state) => state.mode);
  const updateMode = useMode((state) => state.updateMode);

  return (
    <React.Fragment>
      {modes.map((val) => {
        const active = val.value === mode;

        return (
          <TooltipProvider key={val.value} delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className={`h-full relative ${active ? '' : 'text-muted-foreground'}`}
                  variant={active ? 'default' : 'secondary'}
                  onClick={() => updateMode(val.value)}
                >
                  <val.Icon size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>
                <p className='font-medium'>{val.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </React.Fragment>
  );
}
