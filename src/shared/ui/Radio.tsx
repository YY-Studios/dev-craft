'use client';

import { tv } from 'tailwind-variants';

const RadioVariants = tv({
  slots: {
    container: 'flex items-center gap-2 cursor-pointer',
    dotBox: 'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
    dot: 'w-2.5 h-2.5 rounded-full bg-white',
    label: 'text-sm text-[#1E2939]',
  },
  variants: {
    checked: {
      true: {
        dotBox: 'bg-primary border-primary',
      },
      false: {
        dotBox: 'bg-white border-[#D1D5DC]',
      },
    },
  },
  defaultVariants: {
    checked: false,
  },
});

interface CheckboxProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function Radio({ name, value, checked, onChange, label, className }: CheckboxProps) {
  const { container, dotBox, label: labelStyle, dot } = RadioVariants({ checked });
  const id = `${name}-${value}`;

  return (
    <label className={container({ className })}>
      <input
        type="radio"
        id={id}
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span className={dotBox()}>{checked && <span className={dot()} />}</span>
      {label && <span className={labelStyle()}>{label}</span>}
    </label>
  );
}
