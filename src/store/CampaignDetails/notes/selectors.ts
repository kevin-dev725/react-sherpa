import { IState } from './reducers';
import { IResults } from './actions';

interface ICampaignNotes {
  campaignNotes: IState & IResults;
}

export const campaignNotesList = ({ campaignNotes }: ICampaignNotes) => campaignNotes.list || [];
export const campaignNotesStatus = ({ campaignNotes }: ICampaignNotes) => campaignNotes.status;
