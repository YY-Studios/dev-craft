/**
 * 공통 버튼 컴포넌트
 *
 * primary / secondary 스타일을 지원하며,
 * button 또는 link 형태로 사용할 수 있습니다.
 *
 * @example
 * // Primary 버튼
 * <Button>확인</Button>
 *
 * @example
 * // Secondary 버튼
 * <Button variant="secondary">취소</Button>
 *
 * @example
 * // 비활성화 버튼
 * <Button disabled>비활성</Button>
 *
 * @example
 * // 링크 버튼
 * <Button as="link" href="/login">로그인</Button>
 *
 * @example
 * // 링크 + secondary
 * <Button as="link" href="/signup" variant="secondary">
 *   회원가입
 * </Button>
 */

'use client';

import Link, { type LinkProps } from 'next/link';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary';

interface BaseButtonProps {
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: ButtonVariant;
}

interface ButtonAsButton
  extends Omit<ComponentPropsWithoutRef<'button'>, 'children'>, BaseButtonProps {
  as?: 'button';
  href?: never;
}

interface ButtonAsLink extends BaseButtonProps, LinkProps {
  as: 'link';
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  'inline-flex items-center justify-center rounded-md px-4 py-2 transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 ' +
  'disabled:pointer-events-none disabled:opacity-50';

const primary = 'bg-primary text-primary-foreground hover:bg-primary/90';

const secondary =
  'bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80';

export const Button = ({
  children,
  disabled = false,
  className,
  variant = 'primary',
  as = 'button',
  ...props
}: ButtonProps) => {
  const styles = variant === 'primary' ? `${base} ${primary}` : `${base} ${secondary}`;

  if (as === 'link') {
    const { href, onClick, ...rest } = props as ButtonAsLink;

    return (
      <Link
        role="button"
        href={href}
        className={`${styles} ${className ?? ''}`}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? (e) => e.preventDefault() : onClick}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const { type = 'button', ...rest } = props as ComponentPropsWithoutRef<'button'>;

  return (
    <button type={type} disabled={disabled} className={`${styles} ${className ?? ''}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
