import Button from '@/shared/ui/Button';
import Image from 'next/image';
import IconClose from '@/shared/assets/icons/icon_close.svg';

interface BadgeProps {
  label?: string;
  removeFilter: () => void;
  isSingle: boolean;
}

export const Badge = ({ isSingle, label, removeFilter }: BadgeProps) => {
  return (
    <Button
      onClick={isSingle ? undefined : removeFilter}
      className={`gap-2 ${isSingle ? '!bg-[#F76E4D] !cursor-default' : ''}`}
    >
      <span>{label}</span>
      {isSingle ? '' : <Image src={IconClose} alt="닫기" />}
    </Button>
  );
};
