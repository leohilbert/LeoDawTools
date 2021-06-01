import React from "react";
import { Container } from "@material-ui/core";
import MidiNoteSourceCard from "../MidiNoteSourceCard";
import { Droppable } from "react-beautiful-dnd";

export default function MidiNoteColumn({ columnId, notes }) {
  return (
    <Container>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {notes.map((note, index) => (
              <MidiNoteSourceCard
                key={note.pitch.toString()}
                note={note}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Container>
  );
}
