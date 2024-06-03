import { Namespace } from '@frontend/src/const';
import { MainStateNamespace } from '@frontend/src/types/selector';

export function getDataLoadingStatus(state: MainStateNamespace): boolean {
  return state[Namespace.MAIN].isDataLoading;
}
