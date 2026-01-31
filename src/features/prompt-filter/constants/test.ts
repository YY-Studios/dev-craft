export const FILTERS = {
  fruit: {
    label: 'Fruit',
    options: [
      { key: 'apple', label: 'Apple' },
      { key: 'banana', label: 'Banana' },
      { key: 'grape', label: 'Grape' },
      { key: 'orange', label: 'Orange' },
    ],
  },
  color: {
    label: 'Color',
    options: [
      { key: 'red', label: 'Red' },
      { key: 'yellow', label: 'Yellow' },
      { key: 'purple', label: 'Purple' },
      { key: 'green', label: 'Green' },
    ],
  },
} as const;
