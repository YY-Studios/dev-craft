import Button from '@/shared/ui/Button';
import Image from 'next/image';
import IconClose from '@/shared/assets/icons/icon_close.svg';
import { PromptFilterCategory, PromptFilterKey } from '../prompt-filter/types';
interface BadgeProps {
  label?: string;
  removeFilter: () => void;
}
export const Badge = ({ label, removeFilter }: BadgeProps) => {
  return (
    <Button onClick={removeFilter} className=" gap-2">
      <span>{label}</span>
      <Image src={IconClose} alt="닫기" />
    </Button>
  );
};
