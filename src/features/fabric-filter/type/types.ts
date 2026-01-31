import { TEST } from '../contants/test';

export type FabricFilterKey = (typeof TEST)[number]['key'];

export type FabricFilterState = Record<FabricFilterKey, boolean>;
