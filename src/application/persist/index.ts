import createRematchPersist from '@rematch/persist';
import { AllFilters } from 'application/filter';
import storage from 'redux-persist/lib/storage';

export const persistPlugin = createRematchPersist({
  key: 'root',
  whitelist: ['Session'],
  version: 1,
  storage: storage,
  transforms: AllFilters,
});