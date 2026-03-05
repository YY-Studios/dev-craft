import { cn } from '@/shared/lib/cn';

interface TagProps {
  label: string;
  size?: 'sm' | 'md';
}

export const Tag = ({ label, size = 'md' }: TagProps) => {
  return (
    <li
      className={cn(
        'text-primary bg-gray-100 rounded-full',
        size === 'md' ? 'text-xs md:text-sm px-2.5 py-1.5' : 'text-[12px] px-2 py-0.5',
      )}
    >
      <span>{label}</span>
    </li>
  );
};
