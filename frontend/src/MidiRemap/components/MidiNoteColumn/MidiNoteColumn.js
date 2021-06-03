import React from "react";
import { Container } from "@material-ui/core";
import MidiNoteCard from "../MidiSourceNoteCard";
import MidiTargetNoteCard from "../MidiTargetNoteCard";
import { Droppable } from "react-beautiful-dnd";

export default function MidiNoteColumn({ columnId, noteIds, getNoteForId }) {
  const renderCard = (noteId, index) => {
    if (columnId === "source") {
      return (
        <MidiNoteCard
          key={noteId}
          noteId={noteId}
          index={index}
          columnId={columnId}
          getNoteForId={getNoteForId}
        />
      );
    } else {
      return (
        <MidiTargetNoteCard
          key={noteId}
          noteId={noteId}
          getNoteForId={getNoteForId}
        />
      );
    }
  };
  return (
    <Container>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {noteIds.map((noteId, index) => renderCard(noteId, index))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Container>
  );
}
