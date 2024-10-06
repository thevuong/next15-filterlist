import React from 'react';
import ToggleButton from './ToggleButton';

type ToggleOption = {
  label: string;
  value: string;
};

type Props = {
  onToggle: (_options: ToggleOption[]) => void;
  options: ToggleOption[];
  selectedOptions: ToggleOption[];
};

export default function ToggleGroup({ onToggle, options, selectedOptions }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(option => {
        const isActive = selectedOptions
          .map(selectedOption => {
            return selectedOption.value;
          })
          .includes(option.value);
        return (
          <ToggleButton
            key={option.value}
            active={isActive}
            onClick={() => {
              if (isActive) {
                onToggle(
                  selectedOptions.filter(selectedOption => {
                    return selectedOption.value !== option.value;
                  }),
                );
              } else {
                onToggle([...selectedOptions, option]);
              }
            }}
          >
            {option.label}
          </ToggleButton>
        );
      })}
    </div>
  );
}
