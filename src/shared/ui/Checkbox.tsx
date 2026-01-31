'use client';

import { tv } from 'tailwind-variants';

const checkboxVariants = tv({
  slots: {
    container: 'flex items-center gap-2 cursor-pointer',
    box: 'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
    label: 'text-sm text-[#1E2939]',
  },
  variants: {
    checked: {
      true: {
        box: 'bg-[#1E2939] border-[#1E2939]',
      },
      false: {
        box: 'bg-white border-[#D1D5DC]',
      },
    },
  },
  defaultVariants: {
    checked: false,
  },
});

interface CheckboxProps {
  checked: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function Checkbox({ checked, onChange, label, className }: CheckboxProps) {
  const { container, box, label: labelStyle } = checkboxVariants({ checked });

  return (
    <label className={container({ className })}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span className={box()}>
        {checked && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path
              d="M1 5L4.5 8.5L11 1"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {label && <span className={labelStyle()}>{label}</span>}
    </label>
  );
}
