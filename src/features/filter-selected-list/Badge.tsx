import Button from '@/shared/ui/Button';
import Image from 'next/image';
import IconClose from '@/shared/assets/icons/icon_close.svg';

export const Badge = () => {
  return (
    <Button>
      <span>이름</span>
      <Image src={IconClose} alt="닫기" />
    </Button>
  );
};
