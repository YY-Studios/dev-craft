import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'relative flex flex-col gap-1',
    input:
      'w-full rounded-md px-4 py-2 text-base ' +
      'bg-background text-foreground ' +
      'border border-border ' +
      'placeholder:text-muted-foreground ' +
      'focus:outline-none focus:ring-1 focus:ring-ring ' +
      'disabled:bg-muted disabled:cursor-not-allowed disabled:opacity-50',
    iconWrapper: 'absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground',
    rightIconWrapper: 'absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground',
    error: 'text-sm text-destructive mt-1',
  },
  variants: {
    variant: {
      primary: {},
      secondary: {
        input: 'bg-secondary',
      },
    },
    error: {
      true: {
        input: 'border-destructive focus:ring-destructive',
      },
    },
    hasIcon: {
      true: {
        input: 'pl-10',
      },
    },
    hasRightIcon: {
      true: {
        input: 'pr-10',
      },
    },
  },
});
