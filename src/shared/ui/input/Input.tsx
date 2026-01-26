/**
 * 공통 Input 컴포넌트
 *
 * primary / secondary 스타일을 지원하며,
 * 아이콘, 에러 상태, 검색 입력 등 기본적인 입력 UX를 제공합니다.
 *
 * @example
 * // 기본 입력
 * <Input placeholder="이름을 입력하세요" />
 *
 * @example
 * // 검색 입력 (오른쪽 아이콘)
 * <Input
 *   type="search"
 *   placeholder="검색어를 입력하세요"
 *   rightIcon={<SearchIcon />}
 * />
 *
 * @example
 * // 아이콘이 있는 입력
 * <Input
 *   icon={<UserIcon />}
 *   placeholder="사용자 이름"
 * />
 *
 * @example
 * // 에러 상태
 * <Input
 *   error
 *   errorMsg="유효하지 않은 값입니다"
 * />
 *
 * @example
 * // secondary 스타일
 * <Input
 *   variant="secondary"
 *   placeholder="보조 입력"
 * />
 *
 * @example
 * // ref 사용 (form, focus 제어)
 * const ref = useRef<HTMLInputElement>(null);
 * <Input ref={ref} />
 */

'use client';

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { styles } from './Input.styles';
import { cn } from '@/shared/lib/cn';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  error?: boolean;
  errorMsg?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  variant?: 'primary' | 'secondary';
  type?: 'text' | 'password' | 'email' | 'search';
  onChange?: InputHTMLAttributes<HTMLInputElement>['onChange'];
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      disabled = false,
      error = false,
      errorMsg,
      icon,
      rightIcon,
      variant = 'primary',
      type = 'text',
      onChange,
      ...rest
    },
    ref,
  ) => {
    const hasRightIcon = Boolean(rightIcon);

    const {
      container,
      input,
      iconWrapper,
      rightIconWrapper,
      error: errorClass,
    } = styles({
      variant,
      error,
      hasIcon: !!icon,
      hasRightIcon,
    });

    return (
      <div className={container()}>
        {icon && <div className={iconWrapper()}>{icon}</div>}
        {rightIcon && <div className={rightIconWrapper()}>{rightIcon}</div>}

        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={cn(input(), className)}
          onChange={onChange}
          {...rest}
        />

        {error && errorMsg && <span className={errorClass()}>{errorMsg}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
