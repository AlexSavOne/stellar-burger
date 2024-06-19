// src\hooks\hooks.ts

import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
  TypedUseSelectorHook
} from 'react-redux';
import type { AppDispatch, RootState } from '../services/store';

export const useDispatch: () => AppDispatch = useDispatchBase;
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorBase;
