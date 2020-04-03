import { IState } from './reducers';
import { IResults } from './actions';
import { prospectDetailsReducer } from '../../../helpers/variables';

interface IProspectNotes {
  prospectDetailsReducer: {
    prospectNotes: IState & IResults;
  };
}

const reducer = prospectDetailsReducer;

export const prospectNotesList = ({ [reducer]: { prospectNotes } }: IProspectNotes) =>
  prospectNotes.list || [];

export const prospectNotesStatus = ({ [reducer]: { prospectNotes } }: IProspectNotes) =>
  prospectNotes.status;

export const dateSortedProspectList = ({ [reducer]: { prospectNotes } }: IProspectNotes) =>
  [...prospectNotes.list!].sort((a: any, b: any) => {
    const aDate = new Date(a.createdDate),
      bDate = new Date(b.createdDate);
    return (aDate < bDate ? 1 : aDate > bDate ? -1 : 0);
  });
