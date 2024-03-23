import React, { useEffect, useState, useCallback } from 'react';

// Plugins
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

// UI Components
import PortfolioItem1 from './items/PortfolioItem1';
import PortfolioItem2 from './items/PortfolioItem2';
import PortfolioItem3 from './items/PortfolioItem3';

// Images
import portfolio1 from '../../../../assets/images/portfolio/items/item1.png';
import portfolio2 from '../../../../assets/images/portfolio/portfolio2.jpg';
import portfolio3 from '../../../../assets/images/portfolio/portfolio3.jpg';
import portfolio4 from '../../../../assets/images/portfolio/portfolio4.jpg';
import portfolio5 from '../../../../assets/images/portfolio/portfolio5.jpg';

import backArrow from '../../../../assets/images/close-left-arrow.png';
import closeIcon from '../../../../assets/images/close.png';

// Styles
import './style.css';

// Data
import portfolioData from '../../../../data/portfolio.json';

// --------------

interface Note {
  id: number;
  text: string;
  editing: boolean;
  position: { x: number; y: number };
}

function Portfolio() {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, text: '', editing: false, position: { x: 0, y: 0 } },
    { id: 2, text: '', editing: false, position: { x: 0, y: 0 } },
    { id: 3, text: '', editing: false, position: { x: 0, y: 0 } },
    { id: 4, text: '', editing: false, position: { x: 0, y: 0 } },
  ]);
  const [draggedNote, setDraggedNote] = useState<Note | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);

  const handleNoteClick = (id: number, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex !== -1) {
      const updatedNotes = [...notes];
      updatedNotes[noteIndex].editing = true;
      setNotes(updatedNotes);
    }
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>, id: number) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, text: e.target.value } : note
    );
    setNotes(updatedNotes);
  };

  const handleNoteKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>, id: number) => {
    if (e.key === 'Enter') {
      const updatedNotes = notes.map((note) =>
        note.id === id ? { ...note, editing: false } : note
      );
      setNotes(updatedNotes);
    }
  };

  const handleNoteMouseDown = (id: number, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    const note = notes.find((note) => note.id === id);
    if (note) {
      setDraggedNote(note);
      setDragOffset({
        x: event.clientX - note.position.x,
        y: event.clientY - note.position.y,
      });
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (draggedNote && dragOffset) {
      const newX = event.clientX - dragOffset.x;
      const newY = event.clientY - dragOffset.y;
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === draggedNote.id ? { ...note, position: { x: newX, y: newY } } : note
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggedNote(null);
    setDragOffset(null);
  };

  return (
    <>
    <div className="note-container" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {notes.map((note) => (
        <div
          key={note.id}
          className={`note ${note.editing ? 'editing' : ''}`}
          style={{ left: note.position.x, top: note.position.y }}
          onClick={(e) => handleNoteClick(note.id, e)}
          onMouseDown={(e) => handleNoteMouseDown(note.id, e)}>
          {note.editing ? (
            <textarea
              className="note-textarea"
              value={note.text}
              onChange={(e) => handleNoteChange(e, note.id)}
              onKeyPress={(e) => handleNoteKeyPress(e, note.id)}
              autoFocus
            />
          ) : (
            <p>{note.text || ''}</p>
          )}
        </div>
      ))}
    </div>
    </>
  );
};

export default Portfolio;