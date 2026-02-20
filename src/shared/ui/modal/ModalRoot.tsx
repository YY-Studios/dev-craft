import { cn } from '@/shared/lib/cn';
import React, { useEffect } from 'react';

export const Modal = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose}>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">{children}</div>
      </div>
    </>
  );
};

Modal.Content = function Content({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn('bg-white rounded-2xl shadow-xl max-w-md w-full p-6', className)}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

Modal.Header = function Header({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('text-2xl font-semibold mb-4', className)}>{children}</div>;
};

Modal.Body = function Body({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('text-center text-gray-700 mb-6', className)}>{children}</div>;
};

Modal.Footer = function Footer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('flex flex-col gap-2', className)}>{children}</div>;
};
