import { mapIndexToArray } from '../../utils';
import { prospectsResults } from '../../prospectStore/selectors';
import { mergeLeadStageTitle } from '../../prospectStore/transformers';

export const selectProspects = (state: any) => {
  const prospects = prospectsResults(state);
  const { leadStages: { leadStages } } = state;
  const { sort_order = [] } = state.uiStore.prospectSearchView;
  const prospectsArray = sort_order.map((id: number) => prospects[id]);
  return mergeLeadStageTitle(prospectsArray, leadStages);
}

export const selectIsLoadingMoreProspects = (state: any) => state.uiStore.prospectSearchView.isLoadingMore;

export const selectIsLoadingProspect = (state: any) => state.uiStore.prospectSearchView.isLoading;
export const resetSearchResults = (state: any) => state.uiStore.prospectSearchView.reset;
