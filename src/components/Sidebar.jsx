import React from "react";
import addLogo from "../assets/plus.png";
import Delete from "../assets/delete.png";

export default function Sidebar(props) {
  const NotesEL = props.notes;
  return (
    <div className="SideBar">
      <div className="SideBarHeader">
        <h1>Notes</h1>
        <div className="AddMore" onClick={props.handleClick}>
          <img src={addLogo}></img>
        </div>
      </div>
      <div className="NoteList-Wrapper">
        {NotesEL.map((note) => {
          return (
            <div
              className={`Note ${
                note.Id === props.CurrentNote.Id ? "selected" : ""
              }`}
              key={note.Id}
              onClick={() => {
                props.GetID(note.Id);
              }}
            >
              <h4>{note.Header}</h4>
              {note.Id === props.CurrentNote.Id && (
                <img
                  onClick={() => {
                    props.DeleteNote(event, props.CurrentNote.Id);
                  }}
                  className="DeleteIcon"
                  src={Delete}
                ></img>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
