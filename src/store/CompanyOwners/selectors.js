import { profilesToAgents } from "../uiStore/prospectDetailsView/transformers";

export const owners = (state) => profilesToAgents(state.companyOwners.owners);
export const companyId = (state) => {
  let { auth: { userData: { company: { id } } } } = state;

  return id;
};
