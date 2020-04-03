import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import moment from 'moment-timezone';
import usePrevious from '../../hooks/usePrevious';
import { getUserData } from '../../store/Auth/selectors';

import Modal from '../Modal';
import Note from './Note';
import NoteForm from './NoteForm';
import { DataLoader } from '../LoadingData';
import { messageUpdateNote, Success, Fetching } from '../../helpers/variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addNewToast } from '../../store/Toasts/actions';
import { maxMobileWidth } from '../../helpers/variables';

const isMobile = window.innerWidth < maxMobileWidth;

const Heading = styled.div`
  padding: var(--ypad) var(--xpad) var(--pad3);
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  background: var(--darkNavy);
  height: 100%;

  .notes-area {
    flex-basis: 60%;
    background: white;
    flex-grow: 2;
  }

  .comingSoon {
    color: white;
    font-weight: bold;
    font-size: 1.4rem;
    line-height: 1.4;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 400px;
    padding: var(--pad6);
    flex-grow: 1;
    flex-shrink: 2;
  }
`;

const List = styled.ul`
  padding: 0 var(--xpad);
  overflow: hidden;
`;

//update date format used in each note
moment.updateLocale('en', {
  longDateFormat: { LT: 'h:mma' }
});

function NotesTab(props) {
  const {
    updateNotes,
    fetchNotes,
    subject,
    subjectId,
    notesList,
    notesStatus,
    addNote,
    editNote,
    deleteNote,
    restoreNote
  } = props;
  const [modal, setModal] = useState(false);
  // for animation
  const [noteIn, setNoteIn] = useState(false);

  const toggle = () => setModal(state => !state);

  const [newNoteText, setNewNoteText] = useState('');
  const userData = useSelector(getUserData);
  const notes_status = useSelector(notesStatus);
  const dispatch = useDispatch();

  const prevList = usePrevious(notesList) || notesList;

  const handleNewNote = () => {
    const note = {
      text: newNoteText,
      [subject]: subjectId,
      createdBy: userData.id
    };
    const fetchConfig = {
      method: 'post',
      url: '/',
      data: note
    };
    dispatch(updateNotes(fetchConfig, data => dispatch(addNote(data)))).then(() => {
      setModal(false);
      setNewNoteText('');
    });
  };

  const handleEditNote = (note, text) => {
    const updatedNote = { ...note, text };
    const fetchConfig = {
      method: 'patch',
      url: `/${note.id}/`,
      data: updatedNote
    };
    dispatch(editNote(updatedNote));
    dispatch(addNewToast({ message: messageUpdateNote }));
    dispatch(updateNotes(fetchConfig, null, () => dispatch(editNote(note))));
  };

  const handledeleteNote = note => {
    const fetchConfig = {
      method: 'delete',
      url: `/${note.id}/`
    };
    const noteIdx = notesList.findIndex(item => note.id === item.id);
    dispatch(deleteNote(note));
    dispatch(updateNotes(fetchConfig, null, () => dispatch(restoreNote(note, noteIdx))));
  };

  useEffect(() => {
    // populate notes list
    dispatch(fetchNotes(subjectId));
  }, [dispatch, subjectId, fetchNotes, subject]);

  useEffect(() => {
    let diff = notesList.length - prevList.length;
    if (diff > 0) {
      setNoteIn(true);
    } else if (diff < 0) {
      setNoteIn(false);
    } else {
    }
  }, [notesList.length, prevList.length]);

  const mapNotes = () =>
    notesList.map((note, idx) => {
      let anim = false;
      if (idx === 0 && noteIn) {
        anim = true;
      }
      return (
        <Note
          id={note.id}
          key={note.id}
          note={note}
          deleteNote={handledeleteNote}
          updateNote={handleEditNote}
          anim={anim}
        />
      );
    });

  // notes are memoized to prevent rerenders when modal states change
  const memoizedNotes = useMemo(mapNotes, [notesList]);

  const getBtnText = () => {
    let icon = notes_status !== Success ? 'exclamation-triangle' : 'check';
    return !modal ? <FontAwesomeIcon data-test='submit-note-icon' icon={icon} /> : 'Submit Note';
  };

  return (
    <Wrapper data-test='notes-tab'>
      <div className="notes-area">
        <Heading>
          <h3>Notes</h3>
          <Button color='primary' onClick={toggle} data-test='add-note-btn'>
            Add Note
          </Button>
        </Heading>
        <Modal isOpen={modal} toggle={notes_status !== Fetching ? toggle : () => null} title='Add a Note'>
          <NoteForm
            submitNote={handleNewNote}
            text={newNoteText}
            setText={setNewNoteText}
            btnText={getBtnText()}
            notesStatus={notes_status}
          />
        </Modal>
        <DataLoader
          status={notes_status}
          data={notesList}
          emptyResultsMessage='Currently there are no notes to display.'
          renderData={() => <List>{memoizedNotes}</List>}
        />
      </div>
      {!isMobile &&
        <div className="comingSoon text-center">
          Campaign Activity Feed <br/>
          ...Coming Soon...
        </div>
      }
    </Wrapper>
  );
}

export default NotesTab;
