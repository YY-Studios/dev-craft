import { FILTERS } from './constants/options';

export type PromptFilterCategory = keyof typeof FILTERS;
export type PromptFilterKey = (typeof FILTERS)[PromptFilterCategory]['options'][number]['key'];
export type PromptFilterState = Record<PromptFilterCategory, Set<PromptFilterKey>>;
