import { tv } from 'tailwind-variants';

export const styles = tv({
  slots: {
    container: 'relative flex flex-col gap-1',
    input:
      'w-full rounded-md px-4 py-2 text-base ' +
      'bg-white text-gray-900 ' +
      'border border-gray-300 ' +
      'placeholder:text-gray-400 ' +
      'focus:outline-none focus:ring-1 focus:ring-gray-900 ' +
      'disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50',
    iconWrapper: 'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400',
    rightIconWrapper: 'absolute right-3 top-1/2 -translate-y-1/2 text-gray-400',
    error: 'text-sm text-red-500 mt-1',
  },
  variants: {
    variant: {
      primary: {},
      secondary: {
        input: 'bg-gray-50',
      },
    },
    error: {
      true: {
        input: 'border-red-500 focus:ring-red-500',
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
